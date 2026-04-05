import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        
    
    const {productId,rating,comment,userId,name}=await req.json();
    await prisma.review.create({
        data:{
            productId:parseInt(productId),
            rating:parseInt(rating),
            comment:comment,
            userId:parseInt(userId),
            username:name
        }
    })
    const product=await prisma.products.findUnique({
        where:{
            id:parseInt(productId)
        }
    })
    if(product){
        const newRating=(product.rating.toNumber()*product.reviewCount+rating)/(product.reviewCount+1)
        await prisma.products.update({
            where:{
                id:productId
            },
            data:{
                rating:newRating,
                reviewCount:product.reviewCount+1
            }
        })
    }
    revalidatePath(`/shop/${productId}`)
    return NextResponse.json({message:"Review added successfully"},{status:200})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:"Failed to add review",error},{status:500})
    }
    
}