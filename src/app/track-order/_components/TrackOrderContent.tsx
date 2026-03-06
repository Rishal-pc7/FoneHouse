"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { DUMMY_ORDER } from "./data";
import type { Order } from "./types";
import PageHero from "./PageHero";
import SearchForm from "./SearchForm";
import OrderBanner from "./OrderBanner";
import OrderItemsList from "./OrderItemsList";
import DeliveryInfo from "./DeliveryInfo";
import OrderSummary from "./OrderSummary";
import { trackOrder } from "../track.actions";

export default function TrackOrderContent() {
    const searchParams = useSearchParams();
    const [orderId, setOrderId] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Order | null>(null);
    const [error, setError] = useState(false);
    useEffect(() => {
        const idParam = searchParams.get("id");
        if (!idParam) return;
        setOrderId(idParam);
        setLoading(true);
        setResult(null);
        trackOrder(idParam)
            .then((order) => {
                if (!order) { setError(true); return; }
                setResult(order);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId) { setError(true); return; }
        const orderIdNumber = parseInt(orderId.replace("ORD-", ""), 10);
        setError(false);
        setLoading(true);
        setResult(null);
        trackOrder(orderIdNumber.toString())
            .then((order) => {
                if (!order) { setError(true); return; }
                setResult(order);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    };

    return (
        <main className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-background">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brandBlue/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brandRed/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <PageHero />

                <SearchForm
                    orderId={orderId}
                    loading={loading}
                    error={error}
                    hasResult={!!result}
                    onOrderIdChange={setOrderId}
                    onSubmit={handleSearch}
                />

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-5xl mx-auto"
                        >
                            <OrderBanner order={result} />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    <OrderItemsList items={result.OrderItem} />
                                </div>
                                <div className="space-y-8">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <DeliveryInfo customer={{
                                            name: result.firstName + " " + result.lastName,
                                            email: result.email,
                                            address: result.address,
                                            phone: result.phone,
                                        }} />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <OrderSummary
                                            subtotal={result.totalPrice}
                                            total={result.totalPrice}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
