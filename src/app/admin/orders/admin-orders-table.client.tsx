'use client';

import React, { useState } from 'react';
import { AdminOrder, OrderStatus } from './admin-orders.types';
import Link from 'next/link';

interface AdminOrdersTableProps {
    initialOrders: AdminOrder[];
}

export function AdminOrdersTable({ initialOrders }: AdminOrdersTableProps) {
    const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-400';
            case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
            case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
            case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Items</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Total</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <td className="p-4 font-medium dark:text-white">#{order.id}</td>
                                <td className="p-4">
                                    <div className="dark:text-white">{order.customerName}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{order.customerEmail}</div>
                                </td>
                                <td className="p-4 text-gray-500 dark:text-gray-400">
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-gray-500 dark:text-gray-400">{order.items}</td>
                                <td className="p-4 font-medium dark:text-white">${order.total.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <Link
                                        href={`/admin/orders/${order.id}`}
                                        className="text-sm font-medium text-brandBlue hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
