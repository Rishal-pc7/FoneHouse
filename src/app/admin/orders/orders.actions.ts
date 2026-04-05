'use server';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: number, status: string) {
    try {
        const updatedOrder = await db.orders.update({
            where: { id: orderId },
            data: { status }
        });

        revalidatePath('/admin/orders');
        revalidatePath(`/admin/orders/${orderId}`);

        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error('Failed to update order status:', error);
        return { success: false, error: 'Failed to update order status' };
    }
}

export async function getOrderDetails(orderId: number) {
    try {
        const order = await db.orders.findUnique({
            where: { id: orderId },
            include: {
                OrderItem: {
                    include: {
                        Products: true,
                    }
                },
            }
        });
        return order;
    } catch (error) {
        console.error("Failed to fetch order details:", error);
        return null;
    }
}
