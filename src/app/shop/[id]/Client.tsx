"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from '@/context/CartContext';

export function AddToCart() {
    const { addToCart } = useCart();
    return (
        <div className="flex gap-4">
                            <Button
                                size="lg"
                                className="flex-1 rounded-full text-lg h-14 bg-brandBlue hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20"
                                onClick={addToCart}
                            >
                                <ShoppingCart className="mr-2" />
                                Add to Cart
                            </Button>
                        </div>
    )
}