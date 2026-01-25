'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

// Strict type definition for Shop Product
interface ShopProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    isNew?: boolean;
}

const mockShopProducts: ShopProduct[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro Max',
        description: 'Titanium design, A17 Pro chip, 48MP Main camera.',
        price: 4999.00,
        category: 'Mobile Phones',
        imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop', // Placeholder Unsplash image
        isNew: true
    },
    {
        id: '2',
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Galaxy AI is here. Epic titanium build.',
        price: 4599.00,
        category: 'Mobile Phones',
        imageUrl: 'https://images.unsplash.com/photo-1706020586940-0235b866c116?q=80&w=800&auto=format&fit=crop',
        isNew: true
    },
    {
        id: '3',
        name: 'AirPods Pro (2nd Gen)',
        description: 'Rich audio. Next-level Active Noise Cancellation.',
        price: 949.00,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1603351154351-5cf23c6def4d?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '4',
        name: 'MacBook Air M2',
        description: 'Strikingly thin and fast with 18 hours battery life.',
        price: 4999.00,
        category: 'Laptops',
        imageUrl: 'https://images.unsplash.com/photo-1663363321523-952b1130d200?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '5',
        name: 'iPad Pro 12.9"',
        description: 'Supercharged by M2. The ultimate iPad experience.',
        price: 4399.00,
        category: 'Tablets',
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '6',
        name: 'USB-C Fast Charger',
        description: 'High-speed charging for all your devices.',
        price: 129.00,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1629813291243-7a92233f2024?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '7',
        name: 'Apple Watch Ultra 2',
        description: 'The most rugged and capable Apple Watch yet.',
        price: 3199.00,
        category: 'Wearables',
        imageUrl: 'https://images.unsplash.com/photo-1696009893540-0d67f10b7410?q=80&w=800&auto=format&fit=crop',
        isNew: true
    },
    {
        id: '8',
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise canceling headphones.',
        price: 1299.00,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1662492582735-85970c326e5a?q=80&w=800&auto=format&fit=crop'
    }
];

export default function ShopPage() {
    const { addToCart } = useCart(); // Added useCart hook
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
                    {mockShopProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-zinc-800 flex flex-col h-full bg-white dark:bg-zinc-900">
                            {/* Image Container with Hover Effect */}
                            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {product.isNew && (
                                    <span className="absolute top-3 right-3 bg-brandBlue text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                        NEW
                                    </span>
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
                                    SAR {product.price.toLocaleString()}
                                </div>
                                <Button size="sm" className="rounded-full shadow-md hover:scale-105 transition-transform bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200" onClick={addToCart}>
                                    <ShoppingCart size={16} className="mr-2" />
                                    Add
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
