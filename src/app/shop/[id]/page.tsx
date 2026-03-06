import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/db';
import ProductGallery from './ProductGallery.client';
import RelatedProducts from './RelatedProducts';
import ProductDetails from './ProductDetails';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // Find the product
    const product = await prisma.products.findUnique({
        where: { id: parseInt(id) }
    })

    if (!product) {
        notFound();
    }

    const isOutOfStock = !product.isInStock || product.stock <= 0;

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
            {/* Breadcrumb / Back Navigation */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/shop" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brandBlue transition-colors mb-6">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Shop
                </Link>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column - Image Gallery */}
                    <div className="space-y-6 lg:sticky lg:top-24 h-fit">
                        <ProductGallery
                            images={[
                                product.img,
                                // Mock additional images for UI demonstration
                                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000',
                                'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?q=80&w=1000'
                            ]}
                            productName={product.name}
                            isOutOfStock={isOutOfStock}
                        />
                    </div>

                    {/* Right Column - Product Details */}
                    <ProductDetails product={product} isOutOfStock={isOutOfStock} />
                </div>
            </div>

            <RelatedProducts category={product.category} currentProductId={product.id} />
        </main>
    );
}
