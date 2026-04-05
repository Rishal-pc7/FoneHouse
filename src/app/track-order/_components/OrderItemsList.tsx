"use client";

import { motion } from "framer-motion";
import type { OrderItem } from "./types";
import { Package } from "lucide-react";


type Props = { items: OrderItem[] };

export default function OrderItemsList({ items }: Props) {
    return (
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-brandBlue" /> Items in Order
            </h3>
            <div className="space-y-6">
                {items.map((item, idx) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        key={item.id}
                        className="flex gap-4 items-center group"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-muted/50 border border-border/50 shrink-0 relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.Products.img}
                                alt={item.Products.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base md:text-lg line-clamp-2 leading-tight">
                                {item.Products.name}
                            </h4>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Qty: {item.quantity}
                            </p>
                        </div>
                        <div className="font-bold font-urbanist text-lg">
                            ${(item.Products.price * item.quantity).toFixed(2)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
