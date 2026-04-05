"use server";

import prisma from "@/lib/db";

export async function trackOrder(id: string) {
    const order = await prisma.orders.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            OrderItem: {
                include: {
                    Products: true,
                },
            },
        }
    });
    if (!order) return null;
    return {...order,totalPrice: order.totalPrice.toNumber(), OrderItem: order.OrderItem.map((item) => ({
        ...item,
        
        Products: {
            ...item.Products,
            price: item.Products.price.toNumber(),
        },
    }))};
    
}
