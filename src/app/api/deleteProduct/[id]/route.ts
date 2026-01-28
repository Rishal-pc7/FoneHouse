import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await prisma.products.delete({
            where: {
                id: parseInt(id)
            }
        })
        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error as string }, { status: 500 })
    }
}
