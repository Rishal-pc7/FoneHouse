import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try{
        const {cartId,values}=await request.json();
        const cart=await prisma.cart.findUnique({
            where:{
                id:cartId
            },
            include:{
                CartItem:true
            }
        })
        if(!cart){
            return NextResponse.json({error:"Cart not found"},{status:404})
        }
        const order=await prisma.orders.create({
            data:{
                userId:cart.userId,
                sessionId:cart.sessionId,
                totalPrice:cart.totalPrice,
                email:values.email,
                firstName:values.firstName,
                lastName:values.lastName,
                address:values.address,
                city:values.city,
                postalCode:values.postalCode,
                phone:values.phone,
                paymentMethod:values.paymentMethod,
                status:values.paymentMethod==="cod"?"PAID":"PENDING"
            }
        })
        for(const item of cart.CartItem){
            await prisma.orderItem.create({
                data:{
                    orderId:order.id,
                    productId:item.productId,
                    quantity:item.quantity
                }
            })
        }
        await prisma.cartItem.deleteMany({
            where:{
                cartId:cart.id
            }

        })

        await prisma.cart.update({
            where:{
                id:cart.id
            },
            data:{
                totalPrice:0,
                totalItems:0
            }
        })
        if(values.paymentMethod==="prepaid"){
             const payload = {
                type: "e_commerce",
                payment_type: "one_off", // Crucial for Tabby
                currency_code: "SAR",
                amount:cart.totalPrice,
                pg_codes: ["credit-card-bsf"],
                order_no:order.id, // Generate your own unique Order ID
                customer_id: cart.userId || "guest",
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
            const response=await fetch("https://sandbox.ottu.net/b/checkout/v1/pymt-txn/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Api-key ${process.env.OTTU_API_KEY}`
                },
                body:JSON.stringify(payload)
            })
            const data=await response.json()
            return NextResponse.json({data},{status:200})
        }
        return NextResponse.json({message:"Order created successfully",order},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Failed to create order"},{status:500})
    }
    
}