'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useCart } from '@/context/CartContext';
import { checkoutFormSchema, CheckoutFormValues, SerializedCart } from './checkout.types';
import { deleteOrderAction, getPendingOrderAction, validateCouponAction } from './checkout.actions';
import { CheckoutPopup } from './checkout-popup.client';
import { CheckoutFormFields } from './checkout-form-fields.client';
import { CheckoutSummary } from './checkout-summary.client';
export default function CheckoutContent({ cart }: { cart: SerializedCart | null }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showPendingPopup, setShowPendingPopup] = useState(false);
    const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const { setCount } = useCart();
    
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercentage: number } | null>(null);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [couponError, setCouponError] = useState<string | null>(null);

    const baseTotalPrice = cart ? cart.totalPrice : 0;
    const discountAmount = appliedCoupon ? (baseTotalPrice * appliedCoupon.discountPercentage) / 100 : 0;
    const discountedTotalPrice = baseTotalPrice - discountAmount;
    const tax = discountedTotalPrice * 0.15;
    const finalPrice = discountedTotalPrice + tax;

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '', firstName: '', lastName: '', address: '', city: '', postalCode: '', phone: '', paymentMethod: 'cod',
        },
    });

    const paymentMethod = form.watch('paymentMethod');

    useEffect(() => {
        const storedOrderId = localStorage.getItem("orderId");
        const storedSessionId = localStorage.getItem("sessionId");
        if (storedOrderId && storedSessionId) {
            verifyPayment(storedOrderId, storedSessionId);
        }
    }, []);

    async function verifyPayment(storedOrderId: string, storedSessionId: string) {
        setIsVerifying(true);
        try {
            const response = await fetch('/api/checkout/verify-payment', { 
                method: 'POST', 
                body: JSON.stringify({ orderId: storedOrderId, sessionId: storedSessionId }) 
            });
            const data = await response.json();
            if (data.state === "paid") {
                router.push(`/checkout/success/${storedOrderId.replace("ORD-","")}`);
            } else if(data.state === "failed") {
                setPendingOrderId(storedOrderId);
                setShowPendingPopup(true);
            }else{
                setPendingOrderId(storedOrderId);
                setShowPendingPopup(true);
                setSessionId(data.session_id);
            }
        } catch (error) {
            console.error(error);
            setPendingOrderId(storedOrderId);
            setShowPendingPopup(true);
        } finally {
            setIsVerifying(false);
        }
    }

    async function handleStartFresh(deleteDbOrder: boolean) {
        if (deleteDbOrder && pendingOrderId) {
            await deleteOrderAction(pendingOrderId);
        }
        localStorage.removeItem('orderId');
        localStorage.removeItem('sessionId');
        setShowPendingPopup(false);
    }

    async function handleReviewOrder() {
        if (pendingOrderId) {
            const orderData = await getPendingOrderAction(pendingOrderId);
            if (orderData) {
                form.reset({
                    ...form.getValues(),
                    ...orderData
                });
            }
        }
        setShowPendingPopup(false);
    }

    async function handleApplyCoupon() {
        if (!couponCodeInput.trim()) return;
        setIsApplyingCoupon(true);
        setCouponError(null);
        try {
            const productIds = cart?.CartItem?.map(item => item.productId) || [];
            // Parse baseTotalPrice if it's decimal
            const result = await validateCouponAction(couponCodeInput.trim(), Number(baseTotalPrice), productIds);
            if (result.isValid && result.discountPercentage) {
                setAppliedCoupon({ code: couponCodeInput.trim(), discountPercentage: result.discountPercentage });
                // We keep the couponCodeInput intact so it displays in the disabled input
            } else {
                setCouponError(result.message || "Invalid coupon.");
            }
        } catch (err) {
            setCouponError("Failed to apply coupon.");
        } finally {
            setIsApplyingCoupon(false);
        }
    }

    function handleRemoveCoupon() {
        setAppliedCoupon(null);
        setCouponCodeInput('');
    }

    async function onSubmit(values: CheckoutFormValues) {
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ cartId: cart?.id, values,orderId:pendingOrderId?parseInt(pendingOrderId.split('-')[1], 10):null,totalPrice:Number(finalPrice),sessionId:sessionId?sessionId:null }) });
            if (!response.ok) throw new Error('Failed to create order');
            
            const data = await response.json();
            if (paymentMethod === "prepaid") {
                console.log(data);
                localStorage.setItem("error",JSON.stringify(data.data))
                localStorage.setItem("orderId", data.data.order_no);
                localStorage.setItem("sessionId", data.data.session_id);
                window.location.href = data.data.checkout_url;
            } else {
                router.push(`/checkout/success/${data.order.id}`);
                setCount(0);
                localStorage.removeItem('cartCount');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isVerifying) {
        return (
            <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
                <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                    <div className="relative">
                        <div className="absolute inset-0 bg-brandBlue/20 rounded-full blur-xl animate-pulse" />
                        <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl flex items-center justify-center relative z-10 border border-gray-100 dark:border-zinc-800">
                            <Loader2 className="h-8 w-8 animate-spin text-brandBlue" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verifying Payment</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">Please wait while we check the status of your transaction...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 px-4 md:px-8">
            {showPendingPopup && (
                <CheckoutPopup 
                    pendingOrderId={pendingOrderId}
                    onStartFresh={handleStartFresh}
                    onReviewOrder={handleReviewOrder}
                />
            )}
            <div className="container mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Checkout</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Complete your order details below.</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="grow lg:w-2/3">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CheckoutFormFields form={form} />
                            </form>
                        </Form>
                    </div>
                    <div className="lg:w-1/3 shrink-0">
                        <CheckoutSummary 
                            cart={cart}
                            baseTotalPrice={Number(baseTotalPrice)}
                            discountAmount={Number(discountAmount)}
                            discountedTotalPrice={Number(discountedTotalPrice)}
                            tax={Number(tax)}
                            finalPrice={Number(finalPrice)}
                            paymentMethod={paymentMethod}
                            isSubmitting={isSubmitting}
                            onSubmitClick={form.handleSubmit(onSubmit)}
                            couponCodeInput={couponCodeInput}
                            setCouponCodeInput={setCouponCodeInput}
                            onApplyCoupon={handleApplyCoupon}
                            isApplyingCoupon={isApplyingCoupon}
                            appliedCoupon={appliedCoupon}
                            couponError={couponError}
                            onRemoveCoupon={handleRemoveCoupon}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
