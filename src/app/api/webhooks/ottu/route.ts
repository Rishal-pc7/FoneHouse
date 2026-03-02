import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("🔔 Webhook Received!", body);
    if (body.state === 'paid' || body.state === 'authorized') {
      // order_no comes in as "ORD-123" now
      const orderIdString = body.order_no;
      const orderId = parseInt(orderIdString.replace("ORD-", ""), 10);

      console.log(`✅ Payment success for Order: ${orderId}`);

      const orders = await prisma.orders.update({
        where: { id: orderId },
        data: { status: 'PAID' }
      })
      let cart = null;
      cart = await prisma.cart.findUnique({
        where: { id: orders.cartId }
      });

      if (cart) {
        await prisma.cartItem.deleteMany({
          where: {
            cartId: cart.id
          }
        })
        await prisma.cart.update({
          where: {
            id: cart.id
          },
          data: {
            totalPrice: 0,
            totalItems: 0
          }
        })
      }

    } else {
      console.log(`❌ Payment failed or pending for Order: ${body.order_no}`);
      const orderIdString = body.order_no;
      const orderId = parseInt(orderIdString.replace("ORD-", ""), 10);

      if (orderId) {
        await prisma.orders.update({
          where: { id: orderId },
          data: { status: 'FAILED' }
        });
      }
    }

    // 4. THE GOLDEN RULE: Always respond with 200 OK immediately.
    // If you don't, Ottu thinks you died and will keep spamming you.
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
    // Even if your DB fails, tell Ottu you got the message so they stop retrying
    return NextResponse.json({ error: 'Handler failed' }, { status: 200 });
  }
}