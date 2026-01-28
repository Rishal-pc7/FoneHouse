import ShopClient from './ShopClient';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
    const products = await prisma.products.findMany({
        orderBy: {
            created_at: 'desc',
        },
    });

    const formattedProducts = products.map((product) => ({
        ...product,
        price: product.price.toNumber(),
        created_at: product.created_at.toISOString(),
    }));

    return <ShopClient products={formattedProducts} />;
}

