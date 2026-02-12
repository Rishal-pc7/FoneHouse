import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
        const {id} = await params
        const body = await request.json()
        const quantity=body.quantity>0?body.quantity:body.quantity*-1
        
        const cartItem = await prisma.cartItem.update({
            where: {
                id: parseInt(id),
                productId: body.productId
            },
            data: {
                quantity: {increment:body.quantity}
            },
            include:{
                Products:true
            }
        })
        const cart = await prisma.cart.update({
            where: {
                id: cartItem.cartId
            },
            data: {
                totalPrice: {increment:body.quantity*cartItem.Products.price.toNumber()}
            }
        })
            
        return NextResponse.json({ message: 'Cart item updated successfully', data: {totalPrice:cart.totalPrice} }, { status: 200 })
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: error as string }, { status: 500 })
    }
    
    
}