'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-gray-100 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden">
                <div className="bg-brandBlue/5 dark:bg-brandBlue/10 p-8 flex justify-center">
                    <div className="w-24 h-24 bg-brandBlue rounded-full flex items-center justify-center shadow-lg shadow-brandBlue/30 animate-in zoom-in duration-500">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                </div>

                <CardContent className="p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        Thank you for your purchase. Your order has been confirmed and is on its way.
                    </p>

                    <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4 mb-8 text-left border border-gray-200 dark:border-zinc-700">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-zinc-700">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Order Number</span>
                            <span className="font-mono font-bold text-gray-900 dark:text-white">#829301</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</span>
                            <span className="font-medium text-brandGreen flex items-center gap-1">
                                <Package className="w-4 h-4" /> 2-3 Days
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* 
                            This could link to an order tracking page in the future
                        */}
                        <Link href="/shop" className="block">
                            <Button className="w-full h-12 rounded-xl text-base font-semibold bg-brandBlue hover:bg-brandBlue/90 shadow-lg shadow-brandBlue/20">
                                Continue Shopping
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>

                        <Link href="/" className="block">
                            <Button variant="ghost" className="w-full h-12 rounded-xl text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800">
                                Return to Home
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
