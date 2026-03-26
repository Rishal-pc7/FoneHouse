"use server"

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addProductToCart(productId:number,price:number){
    try {
            const cookieStore = await cookies();
            const session = await auth()
            let sessionId = cookieStore.get('session_id')?.value;
            const userId = session?.user?.id
            let cart = null
            if (!sessionId && !userId) {
                sessionId = crypto.randomUUID();
                cookieStore.set('session_id', sessionId, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    
            } else if (userId) {
                cart = await prisma.cart.findUnique({
                    where: {
                        userId: parseInt(userId)
                    }
                })
    
    
            } else if (sessionId) {
                cart = await prisma.cart.findUnique({
                    where: {
                        sessionId: sessionId
                    }
                })
            }
    
            if (!cart) {
                const user = userId ? parseInt(userId) : null
                cart = await prisma.cart.create({
                    data: {
    
                        userId: user,
                        totalPrice: 0,
                        totalItems: 0,
                        sessionId: sessionId
                    }
                })
            }
            const cartItem = await prisma.cartItem.upsert({
                where: {
                    cartId_productId: {
                        cartId: cart.id,
                        productId: productId
                    }
                },
                update: {
                    quantity: { increment: 1 }
                },
                create: {
                    cartId: cart.id,
                    productId: productId,
                    quantity: 1
                }
            })
            const updatedCart = await prisma.cart.update({
                where: {
                    id: cart.id
                },
                data: {
                    totalPrice: cart.totalPrice.toNumber() + (cartItem.quantity * price),
                    totalItems: cart.totalItems + 1
                }
            })
            revalidatePath('/cart');
            return { totalPrice: updatedCart.totalPrice.toNumber(), totalItems: updatedCart.totalItems }
    
    
    
        } catch (error) {
            console.log(error);
    
           return {error:error}
        }
    
}