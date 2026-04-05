'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface OrderSummaryClientProps {
    totalPrice: number;
    cartId: number;
}

export function OrderSummaryClient({ totalPrice, cartId }: OrderSummaryClientProps) {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const tax = totalPrice * 0.15;
    const finalTotal = totalPrice + tax;

    return (
        <div className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        SAR {new Intl.NumberFormat('en-SA').format(totalPrice)}
                    </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (15%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        SAR {new Intl.NumberFormat('en-SA').format(tax)}
                    </span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-zinc-800 my-4" />
                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-brandBlue">
                        SAR {new Intl.NumberFormat('en-SA').format(finalTotal)}
                    </span>
                </div>
            </div>

            <Button
                asChild
                className="w-full h-14 text-lg font-bold rounded-xl bg-brandBlue hover:bg-brandBlue/90 shadow-lg shadow-brandBlue/20 group"
                disabled={isCheckingOut}
            >
                <Link href={`/checkout/${cartId}`} onClick={() => setIsCheckingOut(true)}>
                    {isCheckingOut ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Checkout
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </>
                    )}
                </Link>
            </Button>

            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Shipping & taxes calculated at checkout
                </p>
            </div>
        </div>
    );
}
