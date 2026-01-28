'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ disabled = false }: { disabled?: boolean }) {
    const { addToCart } = useCart();

    return (
        <Button
            size="sm"
            disabled={disabled}
            className={`h-7 w-7 md:h-9 md:w-auto p-0 md:px-4 rounded-full shadow-md transition-transform flex items-center justify-center
                ${disabled
                    ? 'bg-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:scale-105'
                }`}
            onClick={(e) => {
                e.preventDefault();
                if (!disabled) addToCart();
            }}
        >
            <ShoppingCart size={14} className="md:mr-2" />
            <span className="hidden md:inline">{disabled ? 'Sold Out' : 'Add'}</span>
        </Button>
    );
}
