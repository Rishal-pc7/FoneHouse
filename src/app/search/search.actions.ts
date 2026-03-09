'use server';

import db from '@/lib/db';

export async function searchProducts(query: string) {
    if (!query || query.trim().length === 0) {
        return [];
    }

    try {
        const products = await db.products.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return products.map((product) => ({
            ...product,
            price: Number(product.price),
        }));
    } catch (error) {
        console.error('Error searching products:', error);
        return [];
    }
}
