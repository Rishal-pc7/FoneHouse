"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CheckoutPopupProps {
    pendingOrderId: string | null;
    onStartFresh: (deleteDbOrder: boolean) => void;
    onReviewOrder: () => void;
}

export function CheckoutPopup({ pendingOrderId, onStartFresh, onReviewOrder }: CheckoutPopupProps) {
    const [deleteChecked, setDeleteChecked] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pending Order Found</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
                    We noticed you have a pending order (#{pendingOrderId}) that hasn't been paid. Would you like to review it or start fresh?
                </p>
                
                <label className="flex items-center gap-2 mb-6 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={deleteChecked} 
                        onChange={(e) => setDeleteChecked(e.target.checked)}
                        className="rounded border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-brandBlue accent-brandBlue"
                    />
                    Delete this pending order from history
                </label>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button 
                        type="button"
                        variant="outline" 
                        className="flex-1 rounded-xl h-12 text-sm font-semibold"
                        onClick={() => onStartFresh(deleteChecked)}
                    >
                        Start Fresh
                    </Button>
                    <Button 
                        type="button"
                        className="flex-1 rounded-xl h-12 bg-brandBlue hover:bg-brandBlue/90 text-white shadow-lg shadow-brandBlue/20 text-sm font-semibold"
                        onClick={() => onReviewOrder()}
                    >
                        Review Order
                    </Button>
                </div>
            </div>
        </div>
    );
}
