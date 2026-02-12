'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, CreditCard, Loader2, MapPin, Truck, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock Cart Data
const MOCK_CART = {
    items: [
        {
            id: 1,
            name: 'iPhone 15 Pro Max',
            price: 5199,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1695048133169-ea79a5a6836f?q=80&w=2071&auto=format&fit=crop',
            variant: '256GB - Natural Titanium'
        },
        {
            id: 2,
            name: 'AirPods Pro (2nd Gen)',
            price: 949,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1628210889224-53b2e93a6c88?q=80&w=1000&auto=format&fit=crop',
            variant: 'USB-C MagSafe Case'
        }
    ],
    subtotal: 6148,
    shipping: 0,
    tax: 922.2, // 15%
    total: 7070.2
};

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    firstName: z.string().min(2, { message: 'First name is required' }),
    lastName: z.string().min(2, { message: 'Last name is required' }),
    address: z.string().min(5, { message: 'Address is required' }),
    apartment: z.string().optional(),
    city: z.string().min(2, { message: 'City is required' }),
    postalCode: z.string().min(3, { message: 'Postal code is required' }),
    phone: z.string().min(9, { message: 'Valid phone number is required' }),
    paymentMethod: z.enum(['cod', 'prepaid'] as const, {
        message: 'Please select a payment method',
    }),
});

export default function CheckoutPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            apartment: '',
            city: '',
            postalCode: '',
            phone: '',
            paymentMethod: 'cod',
        },
    });

    const paymentMethod = form.watch('paymentMethod');

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Order Data:', values);
        console.log('Cart Data:', MOCK_CART);

        if (values.paymentMethod === 'prepaid') {
            // Simulate redirect to Ottu
            // window.location.href = 'https://ottu.com/checkout/...'; 
            alert('Redirecting to Ottu Payment Gateway...');
            // For now, redirect to success as well for demo
            router.push('/checkout/success');
        } else {
            // COD - Redirect to success
            router.push('/checkout/success');
        }

        setIsSubmitting(false);
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Checkout</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Complete your order details below.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Form */}
                    <div className="grow lg:w-2/3">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* Contact & Shipping Section */}
                                <Card className="border-gray-200 dark:border-zinc-800 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <MapPin className="text-brandBlue w-5 h-5" />
                                            Shipping Information
                                        </CardTitle>
                                        <CardDescription>Where should we send your order?</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john.doe@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>First Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Last Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="123 Main St, Apt 4B" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>City</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Riyadh" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="postalCode"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Postal Code</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="11564" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Phone Number</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+966 50 123 4567" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Payment Section */}
                                <Card className="border-gray-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <ShieldCheck className="w-32 h-32" />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <CreditCard className="text-brandBlue w-5 h-5" />
                                            Payment Method
                                        </CardTitle>
                                        <CardDescription>Select how you would like to pay.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name="paymentMethod"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                                        >
                                                            <FormItem>
                                                                <FormLabel className="cursor-pointer relative">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="cod" className="sr-only peer" />
                                                                    </FormControl>
                                                                    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-gray-300 transition-all h-full bg-white dark:bg-zinc-900 peer-data-[state=checked]:border-brandBlue peer-data-[state=checked]:border-2 peer-data-[state=checked]:bg-blue-50/50 dark:peer-data-[state=checked]:bg-brandBlue/10 peer-data-[state=checked]:text-brandBlue peer-data-[state=checked]:shadow-sm">
                                                                        <Truck className="w-8 h-8 mb-2" />
                                                                        <span className="font-bold">Cash on Delivery</span>
                                                                        <span className="text-xs text-center text-gray-500 peer-data-[state=checked]:text-brandBlue/80">Pay when you receive your order</span>
                                                                    </div>
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem>
                                                                <FormLabel className="cursor-pointer relative">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="prepaid" className="sr-only peer" />
                                                                    </FormControl>
                                                                    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-gray-300 transition-all h-full bg-white dark:bg-zinc-900 peer-data-[state=checked]:border-brandBlue peer-data-[state=checked]:border-2 peer-data-[state=checked]:bg-blue-50/50 dark:peer-data-[state=checked]:bg-brandBlue/10 peer-data-[state=checked]:text-brandBlue peer-data-[state=checked]:shadow-sm">
                                                                        <CreditCard className="w-8 h-8 mb-2" />
                                                                        <span className="font-bold">Pay Online</span>
                                                                        <span className="text-xs text-center text-gray-500 peer-data-[state=checked]:text-brandBlue/80">Secure payment via Ottu</span>
                                                                    </div>
                                                                </FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </form>
                        </Form>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:w-1/3 shrink-0">
                        <div className="sticky top-24">
                            <Card className="border-gray-200 dark:border-zinc-800 shadow-lg bg-white dark:bg-zinc-900">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                        {MOCK_CART.items.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100 dark:border-zinc-800">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-tl-lg">
                                                        x{item.quantity}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.variant}</p>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                                                        SAR {new Intl.NumberFormat('en-SA').format(item.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator className="bg-gray-100 dark:bg-zinc-800" />

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Subtotal</span>
                                            <span>SAR {new Intl.NumberFormat('en-SA').format(MOCK_CART.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Shipping</span>
                                            <span className="text-green-600 font-medium">Free</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Tax (15%)</span>
                                            <span>SAR {new Intl.NumberFormat('en-SA').format(MOCK_CART.tax)}</span>
                                        </div>
                                    </div>

                                    <Separator className="bg-gray-100 dark:bg-zinc-800" />

                                    <div className="flex justify-between items-center">
                                        <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-xl font-extrabold text-brandBlue">
                                            SAR {new Intl.NumberFormat('en-SA').format(MOCK_CART.total)}
                                        </span>
                                    </div>

                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full h-12 text-base font-bold rounded-xl bg-brandBlue hover:bg-brandBlue/90 shadow-lg shadow-brandBlue/20"
                                        onClick={form.handleSubmit(onSubmit)}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                By placing an order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
