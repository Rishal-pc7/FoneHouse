import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Package, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';

export default async function SuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;

    let orderIdNum = parseInt(orderId);
    if (isNaN(orderIdNum)) {
        return notFound();
    }

    const order = await prisma.orders.findUnique({
        where: { id: orderIdNum }
    });

    if (!order) {
        return notFound();
    }

    const isFailed = order.status === 'FAILED';

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-gray-100 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden">
                <div className={`p-8 flex justify-center ${isFailed ? 'bg-red-50 dark:bg-red-900/10' : 'bg-brandBlue/5 dark:bg-brandBlue/10'}`}>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-500 ${isFailed ? 'bg-red-500 shadow-red-500/30' : 'bg-brandBlue shadow-brandBlue/30'}`}>
                        {isFailed ? <XCircle className="w-12 h-12 text-white" /> : <CheckCircle2 className="w-12 h-12 text-white" />}
                    </div>
                </div>

                <CardContent className="p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {isFailed ? 'Payment Failed' : 'Order Placed Successfully!'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        {isFailed
                            ? 'Unfortunately, your payment could not be processed. Please try again with a different payment method.'
                            : 'Thank you for your purchase. Your order has been confirmed and is being processed.'}
                    </p>

                    {!isFailed && (
                        <>
                            <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4 mb-8 text-left border border-gray-200 dark:border-zinc-700">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-zinc-700">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Order Number</span>
                                    <span className="font-mono font-bold text-gray-900 dark:text-white">
                                        #ORD-{orderId}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</span>
                                    <span className="font-medium text-brandGreen flex items-center gap-1">
                                        <Package className="w-4 h-4" /> 2-3 Days
                                    </span>
                                </div>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-8 text-left border border-green-200 dark:border-green-900/30 flex items-start gap-3">
                                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <span className="block text-sm font-semibold text-green-800 dark:text-green-300 mb-1">WhatsApp Update</span>
                                    <span className="text-sm text-green-700 dark:text-green-400">Our team will contact you through WhatsApp shortly to confirm your delivery details.</span>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="space-y-3">
                        {isFailed ? (
                            <Link href={`/checkout/${order.cartId}`} className="block">
                                <Button className="w-full h-12 rounded-xl text-base font-semibold bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20">
                                    Try Payment Again
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/shop" className="block">
                                <Button className="w-full h-12 rounded-xl text-base font-semibold bg-brandBlue hover:bg-brandBlue/90 shadow-lg shadow-brandBlue/20">
                                    Continue Shopping
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        )}

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
