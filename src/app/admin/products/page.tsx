import React from 'react';
import db from '@/lib/db';
import ProductsTable from '@/components/admin/ProductsTable';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await db.products.findMany({
        orderBy: { created_at: 'desc' }
    });
    const formattedProducts = products.map((product) => ({
        ...product,
        price: product.price.toNumber(),
    }));
    return <ProductsTable initialProducts={formattedProducts} />;
}
