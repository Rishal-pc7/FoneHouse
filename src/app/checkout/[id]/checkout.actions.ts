"use server";

import prisma from "@/lib/db";
import { CheckoutFormValues } from "./checkout.types";

export async function getPendingOrderAction(orderIdStr: string,): Promise<Partial<CheckoutFormValues> | null> {
    const orderId = parseInt(orderIdStr.replace('ORD-', ''), 10);
    if (!orderId) return null;

    try {
        const order = await prisma.orders.findUnique({
            where: { id: orderId }
        });
        
        if (!order) return null;

        // Map database fields back to form values
        return {
            email: order.email,
            firstName: order.firstName,
            lastName: order.lastName,
            address: order.address,
            city: order.city,
            postalCode: order.postalCode,
            phone: order.phone,
            // Assuming default or map string if needed
            paymentMethod: order.paymentMethod as 'cod' | 'prepaid', 
        };
    } catch (e) {
        console.error("Failed to fetch pending order:", e);
        return null;
    }
}

export async function deleteOrderAction(orderIdStr: string): Promise<boolean> {
    const orderId = parseInt(orderIdStr.replace('ORD-', ''), 10);
    if (!orderId) return false;

    try {
        // Prisma transaction to safely delete related OrderItems first
        await prisma.$transaction([
            prisma.orderItem.deleteMany({
                where: { orderId }
            }),
            prisma.orders.delete({
                where: { id: orderId }
            })
        ]);
        return true;
    } catch (e) {
        console.error("Failed to delete order logic:", e);
        return false;
    }
}
