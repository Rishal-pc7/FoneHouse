"use client";

import { UseFormReturn } from "react-hook-form";
import { CheckoutFormValues } from "./checkout.types";
import { MapPin, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CheckoutFormFieldsProps {
    form: UseFormReturn<CheckoutFormValues>;
}

export function CheckoutFormFields({ form }: CheckoutFormFieldsProps) {
    return (
        <div className="space-y-8">
            <Card className="border-gray-200 dark:border-zinc-800 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="text-brandBlue w-5 h-5" /> Shipping Information
                    </CardTitle>
                    <CardDescription>Where should we send your order?</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                            <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                            <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Riyadh" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="postalCode" render={({ field }) => (
                            <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="11564" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="+966" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-32 h-32" /></div>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <CreditCard className="text-brandBlue w-5 h-5" /> Payment Method
                    </CardTitle>
                    <CardDescription>Select how you would like to pay.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                        <FormItem className="space-y-3"><FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormItem><FormLabel className="cursor-pointer relative"><FormControl><RadioGroupItem value="cod" className="sr-only peer" /></FormControl>
                                    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-gray-300 transition-all h-full bg-white dark:bg-zinc-900 peer-data-[state=checked]:border-brandBlue peer-data-[state=checked]:border-2 peer-data-[state=checked]:bg-blue-50/50 dark:peer-data-[state=checked]:bg-brandBlue/10 peer-data-[state=checked]:text-brandBlue shadow-sm"><Truck className="w-8 h-8 mb-2" /><span className="font-bold">Cash on Delivery</span></div>
                                </FormLabel></FormItem>
                                <FormItem><FormLabel className="cursor-pointer relative"><FormControl><RadioGroupItem value="prepaid" className="sr-only peer" /></FormControl>
                                    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-gray-300 transition-all h-full bg-white dark:bg-zinc-900 peer-data-[state=checked]:border-brandBlue peer-data-[state=checked]:border-2 peer-data-[state=checked]:bg-blue-50/50 dark:peer-data-[state=checked]:bg-brandBlue/10 peer-data-[state=checked]:text-brandBlue shadow-sm"><CreditCard className="w-8 h-8 mb-2" /><span className="font-bold">Pay Online</span></div>
                                </FormLabel></FormItem>
                            </RadioGroup>
                        </FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
            </Card>
        </div>
    );
}
