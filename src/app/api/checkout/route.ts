import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Orders } from "@/generated/prisma/client";

type CheckoutFormValues = {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    paymentMethod: string;
}

export async function POST(request: NextRequest) {
    try {
        const { cartId, values,orderId,totalPrice,sessionId } = await request.json();
        let existingOrder:Orders|null=null
        if(orderId){
            existingOrder=await prisma.orders.findUnique({
                where: {
                    id: parseInt(orderId)
                }
            })
        }
        const cart = await prisma.cart.findUnique({
            where: {
                id: cartId
            },
            include: {
                CartItem: true
            }
        })
        if (!cart) {
            return NextResponse.json({ error: "Cart not found" }, { status: 404 })
        }
        if(existingOrder){
            const updatedOrder=await updateOrder(existingOrder.id,values,totalPrice)
            if(values.paymentMethod=="cod"){
                await deleteCart(cart.id)
            }
            if(values.paymentMethod=="prepaid"){
                if(sessionId){
                    const data=await updateOttuPayment(totalPrice,values,updatedOrder,sessionId)
                    return NextResponse.json({ data }, { status: 200 })
                }
                const data=await createOttuPayment(totalPrice,values,updatedOrder)
                return NextResponse.json({ data }, { status: 200 })
            }
            return NextResponse.json({ message: "Order updated successfully", order: updatedOrder }, { status: 200 })
        }
        const order = await prisma.orders.create({
            data: {
                userId: cart.userId,
                sessionId: cart.sessionId,
                cartId: cart.id,
                totalPrice: totalPrice,
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                address: values.address,
                city: values.city,
                postalCode: values.postalCode,
                phone: values.phone,
                paymentMethod: values.paymentMethod,
                status: values.paymentMethod === "cod" ? "PAID" : "PENDING",
                OrderItem: {
                    create: cart.CartItem.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            }
        })
        if (values.paymentMethod !== "prepaid") {
            await deleteCart(cart.id)
        }
        if (values.paymentMethod === "prepaid") {
            const data=await createOttuPayment(totalPrice,values,order)
            return NextResponse.json({ data }, { status: 200 })
        }
        return NextResponse.json({ message: "Order created successfully", order }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

}
async function deleteCart(cartId:number){
    await prisma.cartItem.deleteMany({
                where: {
                    cartId: cartId
                }
            })
            await prisma.cart.update({
                where: {
                    id: cartId
                },
                data: {
                    totalPrice: 0,
                    totalItems: 0
                }
            })

} 
async function updateOrder(orderId:number,values:CheckoutFormValues,totalPrice:number) {
     const order=await prisma.orders.update({
                where: {
                    id: orderId
                },
                data: {
                    totalPrice: totalPrice,
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    address: values.address,
                    city: values.city,
                    postalCode: values.postalCode,
                    phone: values.phone,
                    paymentMethod: values.paymentMethod,
                    status: values.paymentMethod === "cod" ? "PAID" : "PENDING",
                }
            })
            return order
}

async function createOttuPayment(totalPrice:number,values:CheckoutFormValues,order:Orders){
      const payload = {
        type: "e_commerce",
        payment_type: "one_off", // Crucial for Tabby
        currency_code: "SAR",
        amount: totalPrice,
        pg_codes: ["credit-card-bsf"],
        order_no: `ORD-${order.id}`, // Add prefix to make it meaningful in Ottu dashboard
        customer_id: order.userId ? order.userId.toString() : "guest",
        customer_email: values.email,
        customer_phone: values.phone, // e.g. +966500000000
        customer_first_name: values.firstName,
        customer_last_name: values.lastName,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success/${order.id}`,
        webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/ottu`, // Your listener
        billing_address: {
            line1: values.address,
            city: values.city,
            country: "SA",
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone: values.phone
        }
    };
    try{

        const response = await fetch(`${process.env.OTTU_BASE_URL}b/checkout/v1/pymt-txn/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Api-key ${process.env.OTTU_API_KEY}`
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return data
        }catch(error){
            console.log(error)
            return error
        }
}

async function updateOttuPayment(totalPrice:number,values:CheckoutFormValues,order:Orders,sessionId:string){
    const payload = {
        type: "e_commerce",
        payment_type: "one_off", // Crucial for Tabby
        currency_code: "SAR",
        amount: totalPrice,
        pg_codes: ["credit-card-bsf"],
        order_no: `ORD-${order.id}`, // Add prefix to make it meaningful in Ottu dashboard
        customer_id: order.userId ? order.userId.toString() : "guest",
        customer_email: values.email,
        customer_phone: values.phone, // e.g. +966500000000
        customer_first_name: values.firstName,
        customer_last_name: values.lastName,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success/${order.id}`,
        webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/ottu`, // Your listener
        billing_address: {
            line1: values.address,
            city: values.city,
            country: "SA",
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone: values.phone
        }
    };
    try{

        const response = await fetch(`${process.env.OTTU_BASE_URL}b/checkout/v1/pymt-txn/${sessionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Api-key ${process.env.OTTU_API_KEY}`
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return data
        }catch(error){
            console.log(error)
            return error
        }
}