"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from '@/context/CartContext';

export function AddToCart({ disabled = false }: { disabled?: boolean }) {
    const { addToCart } = useCart();
    return (
        <div className="flex gap-4">
            <Button
                size="lg"
                disabled={disabled}
                className={`flex-1 rounded-full text-lg h-14 text-white shadow-xl transition-all
                    ${disabled
                        ? 'bg-gray-400 cursor-not-allowed shadow-none hover:bg-gray-400'
                        : 'bg-brandBlue hover:bg-blue-700 shadow-blue-500/20'
                    }`}
                onClick={disabled ? undefined : addToCart}
            >
                <ShoppingCart className="mr-2" />
                {disabled ? 'Out of Stock' : 'Add to Cart'}
            </Button>
        </div>
    )
}