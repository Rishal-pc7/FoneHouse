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
            if (!sessionId && (!userId || session?.user?.role !== "USER")) {
                sessionId = crypto.randomUUID();
                cookieStore.set('session_id', sessionId, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    
            } else if (userId && session?.user?.role === "USER") {
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
                const user = userId && session?.user?.role === "USER" ? parseInt(userId) : null
                cart = await prisma.cart.create({
                    data: {
    
                        userId: user,
                        totalPrice: 0,
                        totalItems: 0,
                        sessionId: sessionId
                    }
                })
            }
            const existingItem = await prisma.cartItem.findUnique({
                where: {
                    cartId_productId: {
                        cartId: cart.id,
                        productId: productId
                    }
                }
            })
            let cartItem;
            let isNewItem=false
            if(existingItem){
                cartItem=await prisma.cartItem.update({
                    where: {
                        cartId_productId: {
                            cartId: cart.id,
                            productId: productId
                        }
                    },
                    data: {
                        quantity: { increment: 1 }
                    }})
            }else{
                isNewItem=true
                cartItem=await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: productId,
                        quantity: 1
                    }
                })
            }
            const updatedCart = await prisma.cart.update({
                where: {
                    id: cart.id
                },
                data: {
                    totalPrice: {increment:price},
                    totalItems:isNewItem?{increment:1}:undefined
                }
            })
            revalidatePath('/cart');
            return { totalPrice: updatedCart.totalPrice.toNumber(), totalItems: updatedCart.totalItems }
    
    
    
        } catch (error) {
            console.log(error);
    
           return {error:error}
        }
    
}