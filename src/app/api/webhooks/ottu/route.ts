import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  try {
    const body = await request.json();
    console.log("🔔 Webhook Received!", body);
    if (body.state === 'paid' || body.state === 'authorized') {
      const orderId = body.order_no; // This matches the ID you sent earlier

      console.log(`✅ Payment success for Order: ${orderId}`);

      await prisma.orders.update({
        where:{id:parseInt(orderId)},
        data:{status:'PAID'}
      })
      
    } else {
      console.log(`❌ Payment failed or pending for Order: ${body.order_no}`);
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