import React from 'react';
import Link from 'next/link';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { createOffer } from './actions';

export default function AddOfferPage() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/offers"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-gray-500"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Offer</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Create a new coupon code.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <form action={createOffer} className="space-y-6">
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <label htmlFor="couponCode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Coupon Code
                            </label>
                            <input
                                type="text"
                                id="couponCode"
                                name="couponCode"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-brandBlue/50 outline-none transition-all"
                                placeholder="e.g. SUMMER25"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="discountPercentage" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Discount Percentage (%)
                            </label>
                            <input
                                type="number"
                                id="discountPercentage"
                                name="discountPercentage"
                                required
                                min="1"
                                max="100"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-brandBlue/50 outline-none transition-all"
                                placeholder="e.g. 20"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isActive"
                                name="isActive"
                                defaultChecked
                                className="w-5 h-5 rounded border-gray-300 text-brandBlue focus:ring-brandBlue"
                            />
                            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Active Immediately
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="bg-brandBlue hover:bg-brandBlue/90 text-white px-6 py-2.5 rounded-xl transition-all font-medium"
                        >
                            Save Offer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
