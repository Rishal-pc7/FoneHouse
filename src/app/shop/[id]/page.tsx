import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, Check, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { AddToCart } from './Client';

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

                    {/* Left Column - Image */}
                    <div className="space-y-6">
                        <div className="relative aspect-square bg-gray-100 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
                            <Image
                                src={product.img}
                                alt={product.name}
                                fill
                                className={`object-cover hover:scale-105 transition-transform duration-700 ${isOutOfStock ? 'grayscale opacity-80' : ''}`}
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {isOutOfStock && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                    Out of Stock
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="flex flex-col justify-start space-y-8">
                        <div>
                            <span className="text-brandBlue font-semibold uppercase tracking-wider text-sm">
                                {product.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex text-amber-500">
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" className="text-gray-300 dark:text-zinc-700" />
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">4.8 (120 Reviews)</span>
                            </div>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="border-t border-b border-gray-100 dark:border-zinc-800 py-6 space-y-4">
                            <div className="flex items-end gap-4">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                    SAR {new Intl.NumberFormat('en-SA').format(product.price.toNumber())}
                                </span>
                                {isOutOfStock && (
                                    <span className="text-red-500 font-medium text-lg mb-1">
                                        Sold Out
                                    </span>
                                )}
                            </div>
                        </div>



                        {/* Value Props */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="text-brandBlue" size={20} />
                                <span>2 Year Warranty</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Truck className="text-brandBlue" size={20} />
                                <span>Free Delivery</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-brandBlue" size={20} />
                                <span>Original Product</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-brandBlue" size={20} />
                                <span>Secure Payment</span>
                            </div>
                        </div>

                        {/* Specifications Section */}
                        {product.specifications && (
                            <div className="pt-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Technical Specifications</h3>
                                <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 md:p-8">
                                    {Array.isArray(product.specifications) ? (
                                        <ul className="space-y-3">
                                            {product.specifications.map((spec, index) => (
                                                <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                                                    <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-brandBlue rounded-full shrink-0" />
                                                    <span>{String(spec)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-y-4">
                                            {Object.entries(product.specifications as Record<string, any>).map(([key, value]) => (
                                                <div key={key} className="grid grid-cols-3 gap-4 border-b border-gray-200 dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
                                                    <dt className="text-gray-500 dark:text-gray-400 font-medium">{key}</dt>
                                                    <dd className="col-span-2 text-gray-900 dark:text-white font-medium">{String(value)}</dd>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <AddToCart disabled={isOutOfStock} />
                    </div>
                </div>
            </div>
        </main>
    );
}
