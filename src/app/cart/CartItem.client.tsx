'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemClientProps {
    item: {
        id: number;
        productId: number;
        Products: {
            name: string;
            price: number;
            img: string;
            category: string;
        };
    };
    quantity: number;
    onUpdateQuantity: (id: number, quantityChange: number, productId: number, price: number) => void;
    onRemoveClick: (id: number) => void;
    priority?: boolean;
}

export function CartItemClient({ item, quantity, onUpdateQuantity, onRemoveClick, priority = false }: CartItemClientProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4">
            <div className="relative w-full sm:w-28 aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0">
                <Image
                    src={item.Products.img}
                    alt={item.Products.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 150px"
                    priority={priority}
                />
            </div>

            <div className="grow w-full">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm text-brandBlue font-medium uppercase tracking-wide mb-1">
                            {item.Products.category}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                            <Link href={`/shop/${item.id}`} className="hover:underline">
                                {item.Products.name}
                            </Link>
                        </h3>
                    </div>
                    <button
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                        onClick={() => onRemoveClick(item.id)}
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                    <div className="font-bold text-xl">
                        SAR {new Intl.NumberFormat('en-SA').format(item.Products.price)}
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 rounded-lg p-1 border border-gray-200 dark:border-zinc-700">
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
                            disabled={quantity <= 1}
                            onClick={() => onUpdateQuantity(item.id, -1, item.productId, item.Products.price)}
                        >
                            <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                            {quantity}
                        </span>
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors"
                            onClick={() => onUpdateQuantity(item.id, 1, item.productId, item.Products.price)}
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
