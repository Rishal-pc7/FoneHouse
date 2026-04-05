import EditProductForm from './_components/EditProductForm.client'
import db from '@/lib/db'
import { notFound } from 'next/navigation'
import { ProductFormData } from '../../products.types'

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
        return notFound();
    }

    const product = await db.products.findUnique({
        where: { id: productId }
    });

    if (!product) {
        return notFound();
    }

    const initialData: ProductFormData = {
        name: product.name,
        description: product.description || '',
        price: product.price.toNumber(),
        category: product.category,
        brand: product.brand,
        stock: product.stock,
        isInStock: product.isInStock,
        img: product.img,
        images: product.images,
        specifications: product.specifications as any,
        warrantyYears: product.warrantyYears,
        shipping: product.shipping as 'FREE' | 'PAID'
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Update product details and inventory.
                </p>
            </div>

            <EditProductForm id={productId} initialData={initialData} />
        </div>
    )
}
