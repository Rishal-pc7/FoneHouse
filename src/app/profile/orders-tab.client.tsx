"use client"

import React from "react"
import { motion } from "framer-motion"
import { Package, Eye } from "lucide-react"
import Link from "next/link"
import { OrderData } from "./profile.types"

interface OrdersTabProps {
    orders: OrderData[]
}

export default function OrdersTab({ orders }: OrdersTabProps) {
    if (orders.length === 0) {
        return (
            <motion.div
                key="no-orders"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
                className="py-12 text-center"
            >
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 text-foreground/50">
                    <Package className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground">When you make a purchase, your orders will appear here.</p>
                <Link href="/shop" className="mt-6 inline-block bg-brandBlue text-white px-6 py-2 rounded-xl font-bold hover:bg-brandBlue/90 transition-colors">
                    Start Shopping
                </Link>
            </motion.div>
        )
    }

    return (
        <motion.div
            key="orders"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-urbanist)]">Order History</h2>
                <span className="text-sm text-muted-foreground">{orders.length} {orders.length === 1 ? 'Total Order' : 'Total Orders'}</span>
            </div>

            <div className="grid gap-4">
                {orders.map((order, index) => {
                    const totalItems = order.OrderItem.reduce((acc, item) => acc + item.quantity, 0)
                    const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                    })

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={order.id}
                            className="group bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all hover:border-brandBlue/30 flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                            <div className="flex items-start gap-4 md:gap-6">
                                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border">
                                    <Package className="w-6 h-6 text-foreground/70" />
                                </div>
                                <div>
                                    <p className="text-sm text-brandBlue font-semibold tracking-wider mb-1 uppercase">
                                        ORD-{order.id}00XL
                                    </p>
                                    <p className="font-bold text-foreground text-lg mb-1">{formattedDate}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                                        <span className="w-1 h-1 rounded-full bg-border" />
                                        <span className="capitalize font-medium flex items-center gap-1.5">
                                            {order.status.toLowerCase() === 'delivered' && <span className="w-2 h-2 rounded-full bg-brandGreen"></span>}
                                            {order.status.toLowerCase() === 'shipped' && <span className="w-2 h-2 rounded-full bg-brandBlue"></span>}
                                            {order.status.toLowerCase() === 'pending' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                                            {order.status.toLowerCase()}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t border-border md:border-none pt-4 md:pt-0">
                                <p className="font-bold text-xl font-[family-name:var(--font-urbanist)] mb-0 md:mb-3">
                                    ${order.totalPrice.toFixed(2)}
                                </p>
                                <Link
                                    href={`/track-order?id=${order.id}`}
                                    className="text-sm font-semibold flex items-center gap-1 text-foreground bg-muted hover:bg-border px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Eye className="w-4 h-4" /> View Details
                                </Link>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
