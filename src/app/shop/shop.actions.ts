"use server";

import prisma from "@/lib/db";
import type { Product } from "./shop.types";

export async function getProducts(): Promise<Product[]> {
    const rows = await prisma.products.findMany({
        orderBy: { created_at: "desc" },
    });

    return rows.map((p) => ({
        ...p,
        price: p.price.toNumber(),
        created_at: p.created_at.toISOString(),
    }));
}
