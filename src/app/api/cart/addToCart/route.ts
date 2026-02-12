import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { productId, price } = await req.json();
        const cookieStore = await cookies();
        let sessionId = cookieStore.get('session_id')?.value;
        const userId = cookieStore.get('user_id')?.value;
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

        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                totalPrice: cart.totalPrice + (cartItem.quantity * price),
                totalItems: cart.totalItems + 1
            }
        })
        return NextResponse.json(
            { message: "Product added to cart", data: cartItem },
            { status: 200 }
        )



    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Failed to add product to cart" },
            { status: 500 }
        )
    }
}

