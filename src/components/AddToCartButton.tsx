'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton() {
    const { addToCart } = useCart();

    return (
        <Button
            size="sm"
            className="h-7 w-7 md:h-9 md:w-auto p-0 md:px-4 rounded-full shadow-md hover:scale-105 transition-transform bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 flex items-center justify-center"
            onClick={(e) => {
                e.preventDefault();
                addToCart();
            }}
        >
            <ShoppingCart size={14} className="md:mr-2" />
            <span className="hidden md:inline">Add</span>
        </Button>
    );
}
