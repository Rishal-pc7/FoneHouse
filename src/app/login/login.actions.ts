"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { cookies } from "next/headers"

export async function updateCartSession() {
    try {
        const cookieStore = await cookies()
        const session = await auth()
        const userId = session?.user.id
        if (!userId) {
            return { status: false, message: "User not found" }
        }
        const parsedUserId = parseInt(userId);
        const userCart = await prisma.cart.findUnique({
            where: {
                userId: parsedUserId
            }
        })
        const CartSession = cookieStore.get("session_id")?.value
        if (!CartSession) {
            return { staus: false, message: "No Cart Found" }
        }
        const sessionCart = await prisma.cart.findUnique({
            where: {
                sessionId: CartSession
            },
        })
        if (sessionCart && userCart) {
            await prisma.cartItem.updateMany({
                where: {
                    cartId: sessionCart.id
                },
                data: {
                    cartId: userCart.id
                }
            })
            await prisma.cart.update({
                where:{
                    id:userCart.id
                },
                data:{
                    totalItems:userCart.totalItems+sessionCart.totalItems,
                    totalPrice:userCart.totalPrice.toNumber()+sessionCart.totalPrice.toNumber(),
                    sessionId:null
                }
            })
            await prisma.cart.deleteMany({where:{id:sessionCart.id}})
            return { message: "Cart updated successfully", status: true }
        }
        else if(!userCart && sessionCart){
            await prisma.cart.update({
                where:{id:sessionCart.id},
                data:{
                    sessionId:null,
                    userId:parsedUserId
                }
            })
            return { message: "Cart updated successfully", status: true }
        }else{
            return { staus: false, message: "No Cart Found" }

        }

    } catch (error) {
        console.log(error)
        return { error: "Failed to update cart", status: false }

    }
}