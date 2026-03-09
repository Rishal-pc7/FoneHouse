import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ results: [] });
        }

        const products = await db.products.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            },
            take: 5,
            select: {
                id: true,
                name: true,
                price: true,
                img: true,
                category: true
            }
        });

        return NextResponse.json({ results: products });
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
