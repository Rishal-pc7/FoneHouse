import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try{
        const body = await req.json()
        const res=await prisma.products.create({
            data:{
                name:body.name,
                description:body.description,
                price:body.price,
                category:body.category,
                brand:body.brand,
                stock:body.stock,
                isInStock:body.isInStock,
                img:body.img,
                specifications:body.specifications
            }
        })
        return NextResponse.json(
            {message:"Product added successfully",data:res},
            {status:200}
        )

    }catch(error){
        console.log(error);
        return NextResponse.json(
            {error:error},
            {status:500}
        )
    }
}