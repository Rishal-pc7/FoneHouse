"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
    productId: number;
    className?: string;
    isOutOfStock: boolean;
    price: number;
}

export default function AddToCartButton({ productId, className, isOutOfStock,price }: AddToCartButtonProps) {
    const { setCount } = useCart();
    const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const response = await fetch("/api/cart/addToCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId,price })
        })
        if (!response.ok) {
            throw new Error("Failed to add product to cart")
        }
        setCount((prev) => prev + 1);
        const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
        localStorage.setItem('cartCount', (currentCount + 1).toString());
    };

    return (
        <Button
            size="sm"
            disabled={isOutOfStock}
            className={cn(
                "rounded-full shadow-md transition-transform flex items-center justify-center",
                isOutOfStock
                    ? "bg-gray-400 cursor-not-allowed shadow-none"
                    : "bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:scale-105",
                className
            )}
            onClick={addToCart}
        >
            <ShoppingCart size={16} className="mr-2" />
            <span className="hidden md:inline">{isOutOfStock ? 'Sold Out' : 'Add'}</span>
        </Button>
    );
}
