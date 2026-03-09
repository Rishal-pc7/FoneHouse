"use server";

import prisma from "@/lib/db";
import type { Product } from "./shop.types";

export async function getProducts(): Promise<Product[]> {
    const rows = await prisma.products.findMany({
        orderBy: { created_at: "desc" },
    });

    const products = rows.map((p) => {
        return {
            ...p,
            price: p.price.toNumber(),
        };
    });
    return products;
}
