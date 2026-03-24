"use client";

import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SerializedCart } from "./checkout.types";

interface CheckoutSummaryProps {
    cart: SerializedCart | null;
    totalPrice: number;
    paymentMethod: string;
    isSubmitting: boolean;
    onSubmitClick: () => void;
}

export function CheckoutSummary({ cart, totalPrice, paymentMethod, isSubmitting, onSubmitClick }: CheckoutSummaryProps) {
    return (
        <div className="sticky top-24">
            <Card className="border-gray-200 dark:border-zinc-800 shadow-lg bg-white dark:bg-zinc-900">
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {cart?.CartItem?.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100 dark:border-zinc-800">
                                    {item.Products.img ? (
                                        <Image src={item.Products.img} alt={item.Products.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center"><span className="text-gray-400 text-xs">No img</span></div>
                                    )}
                                    <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-tl-lg">
                                        x{item.quantity}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.Products.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.Products.category}</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">SAR {new Intl.NumberFormat('en-SA').format(item.Products.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="bg-gray-100 dark:bg-zinc-800" />
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>SAR {new Intl.NumberFormat('en-SA').format(totalPrice)}</span></div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Shipping</span><span className="text-green-600 font-medium">Free</span></div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax (15%)</span><span>SAR {new Intl.NumberFormat('en-SA').format(totalPrice * 0.15)}</span></div>
                    </div>

                    <Separator className="bg-gray-100 dark:bg-zinc-800" />
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="text-xl font-extrabold text-brandBlue">SAR {new Intl.NumberFormat('en-SA').format(totalPrice + (totalPrice * 0.15))}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full h-12 text-base font-bold rounded-xl bg-brandBlue hover:bg-brandBlue/90 shadow-lg shadow-brandBlue/20" onClick={onSubmitClick} disabled={isSubmitting}>
                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : <>{paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}<ArrowRight className="ml-2 h-4 w-4" /></>}
                    </Button>
                </CardFooter>
            </Card>
            <p className="text-xs text-center text-gray-400 mt-4">By placing an order, you agree to our Terms of Service.</p>
        </div>
    );
}
