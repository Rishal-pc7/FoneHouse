"use server"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateCartItemQuantity = async (id: number, quantity: number, productId: number) => {
    try {
        const cartItem = await prisma.cartItem.update({
            where: {
                id: id,
                productId: productId
            },
            data: {
                quantity: {increment:quantity}
            },
            include:{
                Products:true
            }
        })
        const cart = await prisma.cart.update({
            where: {
                id: cartItem.cartId
            },
            data: {
                totalPrice: {increment:quantity*cartItem.Products.price.toNumber()}
            }
        })
        revalidatePath("/cart")
        return {totalPrice:cart.totalPrice.toNumber(),quantity:cartItem.quantity};
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw typeof error === 'string' ? new Error(error) : error instanceof Error ? error : new Error('Unknown error');
    }
};

export const removeCartItem = async (id: number) => {
    try {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: id },
            include: { Products: true }
        });
        if (!cartItem) {
            throw new Error("Cart Item Not found") 
        }
        await prisma.cartItem.delete({
            where: { id: id }
        });
        const cart = await prisma.cart.update({
            where: { id: cartItem.cartId },
            data: {
                totalPrice: { decrement: cartItem.quantity * cartItem.Products.price.toNumber() },
                totalItems: { decrement: 1 }
            }
        })
        return {totalPrice:cart.totalPrice.toNumber(),totalItems:cart.totalItems};
    } catch (error) {
        console.error('Error removing cart item:', error);
        throw error;
    }
};
