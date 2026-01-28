import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AddToCartButton from './AddToCartButton';
import prisma from '@/lib/db';
import { JsonValue } from '@prisma/client/runtime/client';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    img: string;
    isNew?: boolean;
    created_at: Date;
    specifications: JsonValue;
}


export default async function TopProductsSection() {
    const topProducts: Product[] = await prisma.products.findMany({
        take: 4,
        orderBy: {
            created_at: 'desc',
        },
    });
    return (
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-zinc-950">
            <div className="w-full px-4 md:px-10 max-w-[1440px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-10 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                            Top Selling Products
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0">
                            Explore our most popular gadgets and accessories.
                        </p>
                    </div>
                    <Link href="/shop" className="hidden md:inline-flex items-center text-brandBlue hover:text-blue-700 font-medium hover:underline transition-all">
                        View All Products <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                {/* Grid: 2 columns on mobile (smaller items), 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {topProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-zinc-800 flex flex-col h-full bg-white dark:bg-zinc-900 py-0 gap-0">
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                <Image
                                    src={product.img}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                                />
                                {product.isNew && (
                                    <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-brandBlue text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shadow-lg">
                                        NEW
                                    </span>
                                )}
                            </div>

                            <CardHeader className="p-3 md:p-5 pb-0 md:pb-2">
                                <div className="text-[10px] md:text-xs font-medium text-brandBlue mb-1 uppercase tracking-wider">
                                    {product.category}
                                </div>
                                <CardTitle className="text-sm md:text-lg line-clamp-1 group-hover:text-brandBlue transition-colors">
                                    {product.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-3 md:p-5 pt-0 md:pt-0 grow">
                                <CardDescription className="line-clamp-2 text-xs md:text-sm">
                                    {product.description}
                                </CardDescription>
                            </CardContent>

                            <CardFooter className="p-3 md:p-5 pt-0 md:pt-0 flex items-center justify-between mt-auto">
                                <div className="text-sm md:text-xl font-bold text-gray-900 dark:text-white">
                                    SAR {product.price.toLocaleString()}
                                </div>
                                <AddToCartButton />
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/shop" className="inline-flex items-center text-brandBlue hover:text-blue-700 font-medium hover:underline transition-all">
                        View All Products <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
