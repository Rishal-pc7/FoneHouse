'use client';

import Link from 'next/link';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function EmptyCart() {
    const { cartCount, setCount } = useCart();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        
        // If the server confirms the cart is empty but local storage has a count,
        // it means either:
        // 1. A stale cache during an active mutation (e.g. Add to Cart)
        // 2. A true DB desync (e.g. User removed from DB by admin)
        if (cartCount > 0) {
            router.refresh(); // Ask server for absolute latest state

            // Give the server 3 seconds to replace this component with the real Cart.
            // If this component doesn't unmount in 3 seconds, we have a hard desync.
            const timeout = setTimeout(() => {
                setCount(0);
                localStorage.setItem('cartCount', '0');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [cartCount, setCount, router]);

    // Minor delay to hide hydration mismatch and syncing
    if (!mounted || cartCount > 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
                <Loader2 className="w-10 h-10 animate-spin text-brandBlue mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading your cart...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100 dark:border-zinc-800">
                <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link className="p-2 w-full h-12 rounded-xl text-base font-semibold bg-brandBlue hover:bg-brandBlue/90 inline-flex items-center justify-center text-white" href="/shop">
                    Start Shopping
                </Link>
            </div>
        </div>
    );
}
