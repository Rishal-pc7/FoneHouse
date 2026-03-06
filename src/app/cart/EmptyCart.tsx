import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export function EmptyCart() {
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
