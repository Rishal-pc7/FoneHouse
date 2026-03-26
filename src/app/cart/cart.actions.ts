'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { cookies } from 'next/headers';
export async function getCart() {
    const cookieStore = await cookies();
    const session = await auth();
    const userId = session?.user?.id;
    const sessionId = cookieStore.get('session_id')?.value;

    let cart = null;

    if (userId) {
        cart = await prisma.cart.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                CartItem: {
                    include: {
                        Products: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                img: true,
                                category: true,
                                isInStock: true,
                                brand: true,
                                created_at: true,
                            },
                        },
                    },
                },
            },
        });
    } else if (sessionId) {
        cart = await prisma.cart.findUnique({
            where: { sessionId: sessionId },
            include: {
                CartItem: {
                    include: {
                        Products: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                img: true,
                                category: true,
                                isInStock: true,
                                brand: true,
                                created_at: true,
                            },
                        },
                    },
                },
            },
        });
    }

    if (!cart) return null;

    // Transform Decimal to number for serialization
    return {
        ...cart,
        totalPrice: cart.totalPrice.toNumber(),
        CartItem: cart.CartItem.map((item) => ({
            ...item,
            Products: {
                ...item.Products,
                price: item.Products.price.toNumber(),
            },
        })),
    };
}