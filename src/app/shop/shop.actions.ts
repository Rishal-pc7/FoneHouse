"use server";

import prisma from "@/lib/db";
import type { Product } from "./shop.types";

export async function getProducts(): Promise<Product[]> {
    const rows = await prisma.products.findMany({
        orderBy: { created_at: "desc" },
        select:{
            id:true,
            name:true,
            category:true,
            description:true,
            price:true,
            isInStock:true,
            stock:true,
            brand:true,
            created_at:true,
            img:true
        }
            
    
    });

    const products = rows.map((p) => {
        return {
            ...p,
            price: p.price.toNumber(),
        };
    });
    return products;
}
