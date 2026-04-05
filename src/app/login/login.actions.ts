"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { cookies } from "next/headers"

export async function updateCartSession() {
    try {
        const cookieStore = await cookies();
        const session = await auth();
        const userId = session?.user?.id;
        let cart;
        if (!userId) {
            return { status: false, message: "User not found" };
        }
        
        const parsedUserId = parseInt(userId);
        
        // 1. Fetch User Cart
        const userCart = await prisma.cart.findUnique({
            where: { userId: parsedUserId },
            include: { CartItem: true }
        });
        
        const CartSession = cookieStore.get("session_id")?.value;
        if (!CartSession) {
            return { status: false, message: "No Cart Found" };
        }
        
        // 2. Fetch Session Cart
        const sessionCart = await prisma.cart.findUnique({
            where: { sessionId: CartSession },
            include: { CartItem: true }
        });

        // ==========================================
        // SCENARIO A: BOTH CARTS EXIST -> MERGE THEM
        // ==========================================
        if (sessionCart && userCart) {
            
            // Wrap the entire merge in a transaction
            await prisma.$transaction(async (tx) => {
                let commonItems = 0;
                // 1. Loop through the items in the guest session cart
                for (const sessionItem of sessionCart.CartItem) {
                    
                    // Check if the logged-in user already has this item in their cart
                    const existingUserItem = userCart.CartItem.find(
                        (item) => item.productId === sessionItem.productId
                    );

                    if (existingUserItem) {
                        // COMMON PRODUCT: Add quantities together
                        commonItems++;
                        await tx.cartItem.update({
                            where: { id: existingUserItem.id },
                            data: { quantity: existingUserItem.quantity + sessionItem.quantity }
                        });
                        
                        // Delete the duplicate session item
                        await tx.cartItem.delete({
                            where: { id: sessionItem.id }
                        });
                        
                    } else {
                        // NEW PRODUCT: Move the session item to the user's cart
                        await tx.cartItem.update({
                            where: { id: sessionItem.id },
                            data: { cartId: userCart.id }
                        });
                    }
                }

                // 2. Update the user cart totals
                cart = await tx.cart.update({
                    where: { id: userCart.id },
                    data: {
                        totalItems: (userCart.totalItems + sessionCart.totalItems) - commonItems ,
                        totalPrice: userCart.totalPrice.toNumber() + sessionCart.totalPrice.toNumber(),
                        sessionId: null // Clear session ID if you are moving away from it
                    }
                });

                // 3. Delete the now-empty session cart
                await tx.cart.delete({
                    where: { id: sessionCart.id }
                });
                
            });

            return { message: "Cart merged successfully", status: true };
        } 
        
        // ==========================================
        // SCENARIO B: ONLY SESSION CART EXISTS -> ASSIGN TO USER
        // ==========================================
        else if (!userCart && sessionCart) {
            cart = await prisma.cart.update({
                where: { id: sessionCart.id },
                data: {
                    sessionId: null,
                    userId: parsedUserId
                }
            });
            return { message: "Cart assigned successfully", status: true,cartCount:cart.totalItems };
            
        } else {
            return { status: false, message: "No Cart Found",cartCount:0 };
        }

    } catch (error) {
        console.error("Cart update error:", error);
        return { error: "Failed to update cart", status: false };
    }
}