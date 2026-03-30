"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { OrderData } from "./profile.types"

export async function getUserOrders(): Promise<{ success: boolean; data?: OrderData[]; error?: string }> {
    try {
        const session = await auth()
        const userIdRaw = session?.user?.id

        if (!userIdRaw) {
            return { success: false, error: "Unauthorized" }
        }

        const userId = parseInt(userIdRaw, 10)
        if (isNaN(userId)) {
             return { success: false, error: "Invalid User ID" }
        }

        const orders = await prisma.orders.findMany({
            where: {
                userId: userId
            },
            include: {
                OrderItem: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        // Map data to omit Decimal for client component serialization
        const serializedOrders: OrderData[] = orders.map(order => ({
            ...order,
            totalPrice: order.totalPrice.toNumber(),
            created_at: order.created_at.toISOString(),
            updated_at: order.updated_at.toISOString()
        }))

        return { success: true, data: serializedOrders }
    } catch (error) {
        console.error("Failed to fetch user orders:", error)
        return { success: false, error: "Database error fetching orders" }
    }
}
