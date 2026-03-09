'use client';

import { useState } from 'react';
import { updateOrderStatus } from '../../orders.actions';
import { useRouter } from 'next/navigation';

interface Props {
    orderId: number;
    initialStatus: string;
}

export function OrderStatusUpdater({ orderId, initialStatus }: Props) {
    const [status, setStatus] = useState(initialStatus.toLowerCase());
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const handleUpdate = async () => {
        setIsUpdating(true);
        const result = await updateOrderStatus(orderId, status.toUpperCase());
        setIsUpdating(false);

        if (result.success) {
            alert('Order status updated successfully');
            router.refresh();
        } else {
            alert('Failed to update order status');
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Status
                </label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={isUpdating}
                    className="w-full text-sm rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 focus:ring-brandBlue focus:border-brandBlue disabled:opacity-50"
                >
                    <option value="pending">Pending</option>
                    <option value="placed">Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <button
                onClick={handleUpdate}
                disabled={isUpdating || status === initialStatus.toLowerCase()}
                className="w-full py-2 px-4 bg-brandBlue hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isUpdating ? 'Updating...' : 'Update Status'}
            </button>
        </div>
    );
}
