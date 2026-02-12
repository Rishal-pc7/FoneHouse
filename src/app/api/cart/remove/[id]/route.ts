import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const cartItemId = parseInt(id);

        // Find the cart item to get its price and cartId
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { Products: true }
        });

        if (!cartItem) {
            return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
        }

        // Delete the cart item
        await prisma.cartItem.delete({
            where: { id: cartItemId }
        });

        // Update the cart total price
        const cart = await prisma.cart.update({
            where: { id: cartItem.cartId },
            data: {
                totalPrice: { decrement: cartItem.quantity * cartItem.Products.price.toNumber() }
            }
        });

        return NextResponse.json({ message: 'Cart item removed successfully', data: { totalPrice: cart.totalPrice } }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
