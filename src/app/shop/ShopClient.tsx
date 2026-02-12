'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import AddToCartButton from '@/components/AddToCartButton';

interface ShopClientProps {
    products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {


    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-20">
            {/* Hero / Header Section */}
            <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                        Shop Our Collection
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover the latest mobile phones, accessories, and gadgets. Quality products at the best prices.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-brandBlue/50 transition-all shadow-sm"
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="w-full md:w-auto gap-2 h-12 rounded-xl">
                            <Filter size={18} />
                            Filter by Category
                        </Button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const isOutOfStock = !product.isInStock || product.stock <= 0;
                        return (
                            <Link href={`/shop/${product.id}`} key={product.id} className="block h-full">
                                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-zinc-800 flex flex-col h-full bg-white dark:bg-zinc-900 py-0 gap-0">
                                    {/* Image Container with Hover Effect */}
                                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                        <Image
                                            src={product.img} // Updated to match DB schema
                                            alt={product.name}
                                            fill
                                            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-80' : ''}`}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {isOutOfStock && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                                                Out of Stock
                                            </div>
                                        )}
                                    </div>

                                    <CardHeader className="p-5 pb-2">
                                        <div className="text-xs font-medium text-brandBlue mb-1 uppercase tracking-wider">
                                            {product.category}
                                        </div>
                                        <CardTitle className="text-lg line-clamp-1 group-hover:text-brandBlue transition-colors">
                                            {product.name}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="p-5 pt-0 grow">
                                        <CardDescription className="line-clamp-2 text-sm">
                                            {product.description}
                                        </CardDescription>
                                    </CardContent>

                                    <CardFooter className="p-5 pt-0 flex items-center justify-between mt-auto">
                                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                                            SAR <span>{new Intl.NumberFormat('en-SA').format(product.price)}</span>
                                        </div>
                                        <AddToCartButton productId={product.id} isOutOfStock={isOutOfStock} price={product.price} />
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main >
    );
}
