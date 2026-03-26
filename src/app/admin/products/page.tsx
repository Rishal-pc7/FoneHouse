import React from 'react';
import db from '@/lib/db';
import ProductsTableWrapper from './_components/ProductsTableWrapper.client';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await db.products.findMany({
        orderBy: { created_at: 'desc' }
    });
    const formattedProducts = products.map((product) => {
        return {
            ...product,
            price: product.price.toNumber(),
        };
    });
    return <ProductsTableWrapper initialProducts={formattedProducts} />;
}
