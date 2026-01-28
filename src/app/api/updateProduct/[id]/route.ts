import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    
    try {
        const { id } = await params
        const product = await prisma.products.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Product found', data: product }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error as string }, { status: 500 })
        
        
    }
}
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const body = await request.json()
        const product = await prisma.products.update({
            where: {
                id: parseInt(id)
            },
            data: body
        })
        return NextResponse.json({ message: 'Product updated successfully', data: product }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error as string }, { status: 500 })
    }
}