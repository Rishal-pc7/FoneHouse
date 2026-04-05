"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

type Props = {
    orderId: string;
    loading: boolean;
    error: boolean;
    hasResult: boolean;
    onOrderIdChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
};

export default function SearchForm({
    orderId,
    loading,
    error,
    hasResult,
    onOrderIdChange,
    onSubmit,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-2xl mx-auto transition-all duration-700 ${hasResult ? "mb-12" : "mb-32 mt-12"
                }`}
        >
            <form onSubmit={onSubmit} className="relative group">
                <div
                    className={[
                        "absolute -inset-1 rounded-2xl blur-lg opacity-50",
                        "bg-linear-to-r from-brandBlue/30 via-brandGreen/30 to-brandRed/30",
                        "group-hover:opacity-100 transition duration-500",
                    ].join(" ")}
                />
                <div
                    className={[
                        "relative flex flex-col sm:flex-row gap-2",
                        "bg-card/80 backdrop-blur-xl border border-border/50 p-2 rounded-2xl shadow-2xl",
                    ].join(" ")}
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => onOrderIdChange(e.target.value)}
                            placeholder="Order ID (e.g. ORD-84392)"
                            className={[
                                "w-full bg-transparent border-none focus:ring-0",
                                "pl-12 pr-4 py-4 text-base md:text-lg font-medium outline-none",
                                "placeholder:text-muted-foreground/60",
                                error ? "text-destructive" : "text-foreground",
                            ].join(" ")}
                        />
                    </div>
                    <div
                        className={[
                            "bg-foreground text-background hover:bg-foreground/90",
                            "px-8 py-4 rounded-xl font-bold transition-all",
                            loading ? "opacity-70 pointer-events-none" : "",
                            "flex items-center justify-center min-w-[140px]",
                        ].join(" ")}
                    >
                        {loading ? (
                            <motion.button
                                type="button"
                                disabled
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                            />
                        ) : (
                            <button type="submit" className="w-full h-full outline-none">
                                Track Order
                            </button>
                        )}
                    </div>
                </div>
                {error && (
                    <p className="absolute -bottom-7 left-4 text-destructive text-sm font-medium">
                        Please enter a valid Order ID
                    </p>
                )}
            </form>
        </motion.div>
    );
}
