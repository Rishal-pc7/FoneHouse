"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Loader2, Tag } from "lucide-react";
import { getAvailableCouponsAction } from "./checkout.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SerializedCart } from "./checkout.types";

interface CheckoutSummaryProps {
    cart: SerializedCart | null;
    baseTotalPrice: number;
    discountAmount: number;
    discountedTotalPrice: number;
    tax: number;
    finalPrice: number;
    paymentMethod: string;
    isSubmitting: boolean;
    onSubmitClick: () => void;
    couponCodeInput: string;
    setCouponCodeInput: (code: string) => void;
    onApplyCoupon: () => void;
    isApplyingCoupon: boolean;
    appliedCoupon: { code: string; discountPercentage: number } | null;
    couponError: string | null;
    onRemoveCoupon: () => void;
}

export function CheckoutSummary({ 
    cart, 
    baseTotalPrice, 
    discountAmount, 
    discountedTotalPrice, 
    tax, 
    finalPrice, 
    paymentMethod, 
    isSubmitting, 
    onSubmitClick,
    couponCodeInput,
    setCouponCodeInput,
    onApplyCoupon,
    isApplyingCoupon,
    appliedCoupon,
    couponError,
    onRemoveCoupon
}: CheckoutSummaryProps) {
    const [availableCoupons, setAvailableCoupons] = useState<{ id: number, couponCode: string, discountPercentage: number, minCartValue: number | null }[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        getAvailableCouponsAction().then((coupons) => {
            setAvailableCoupons(coupons);
        });
    }, []);

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
                    
                    {/* Coupon Section */}
                    <div className="space-y-3 relative">
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                placeholder="Coupon code"
                                value={couponCodeInput}
                                onChange={(e) => setCouponCodeInput(e.target.value)}
                                onFocus={() => setIsDropdownOpen(true)}
                                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                disabled={isApplyingCoupon || appliedCoupon !== null}
                                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-brandBlue/50 outline-none transition-all disabled:opacity-50"
                            />
                            <Button 
                                type="button" 
                                variant={appliedCoupon ? "destructive" : "outline"} 
                                onClick={appliedCoupon ? onRemoveCoupon : onApplyCoupon}
                                disabled={isApplyingCoupon || (!appliedCoupon && !couponCodeInput.trim())}
                                className="shrink-0 h-[38px] rounded-xl"
                            >
                                {isApplyingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : (appliedCoupon ? 'Remove' : 'Apply')}
                            </Button>
                        </div>
                        
                        {/* Coupons Dropdown */}
                        {isDropdownOpen && availableCoupons.length > 0 && !appliedCoupon && (
                            <div className="absolute top-[42px] left-0 right-[88px] z-10 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="max-h-48 overflow-y-auto">
                                    {availableCoupons.map((coupon) => (
                                        <button
                                            key={coupon.id}
                                            type="button"
                                            onClick={() => {
                                                setCouponCodeInput(coupon.couponCode);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full flex flex-col px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors border-b border-gray-100 dark:border-zinc-800 last:border-0"
                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <span className="font-bold text-sm text-brandBlue flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" />{coupon.couponCode}</span>
                                                <span className="text-xs font-semibold text-green-600 dark:text-green-400">-{coupon.discountPercentage}%</span>
                                            </div>
                                            {coupon.minCartValue ? (
                                                <span className="text-[10px] text-gray-500 mt-0.5">Min cart value: SAR {coupon.minCartValue}</span>
                                            ) : null}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {couponError && <p className="text-xs text-red-500">{couponError}</p>}
                        {appliedCoupon && <p className="text-xs text-green-600 dark:text-green-400">Coupon {appliedCoupon.code} applied (-{appliedCoupon.discountPercentage}%)</p>}
                    </div>

                    <Separator className="bg-gray-100 dark:bg-zinc-800" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>SAR {new Intl.NumberFormat('en-SA').format(baseTotalPrice)}</span></div>
                        
                        {appliedCoupon && (
                            <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                                <span>Discount</span>
                                <span>-SAR {new Intl.NumberFormat('en-SA').format(discountAmount)}</span>
                            </div>
                        )}
                        
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Shipping</span><span className="text-green-600 font-medium">Free</span></div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax (15%)</span><span>SAR {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(tax)}</span></div>
                    </div>

                    <Separator className="bg-gray-100 dark:bg-zinc-800" />
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="text-xl font-extrabold text-brandBlue">SAR {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(finalPrice)}</span>
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
