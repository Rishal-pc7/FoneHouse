import React from 'react';
import Link from 'next/link';
import Plus from 'lucide-react/dist/esm/icons/plus';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
    const offers = await db.offer.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Offers</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage active coupon codes and discount percentages.</p>
                </div>
                <Link
                    href="/admin/offers/add"
                    className="flex items-center gap-2 bg-brandBlue hover:bg-brandBlue/90 text-white px-4 py-2 rounded-xl transition-all font-medium"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Offer</span>
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left max-w-full">
                        <thead className="bg-gray-50 dark:bg-zinc-900/50 text-gray-500 dark:text-gray-400 text-sm font-medium border-b border-gray-200 dark:border-zinc-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">Coupon Code</th>
                                <th className="px-6 py-4 font-medium">Discount</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                            {offers.map((offer) => (
                                <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {offer.couponCode}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {offer.discountPercentage}%
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${offer.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {offer.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-gray-400 text-sm">N/A</span>
                                    </td>
                                </tr>
                            ))}
                            {offers.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No offers found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
