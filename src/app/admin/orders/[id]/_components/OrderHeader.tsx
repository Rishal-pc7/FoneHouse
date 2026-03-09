import Link from 'next/link';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import { OrderWithDetails } from '../../admin-orders.types';

export default function OrderHeader({ order }: { order: OrderWithDetails }) {
    return (
        <div className="flex items-center gap-4">
            <Link
                href="/admin/orders"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    Order #{order.id}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize 
                        ${order.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' :
                            order.status.toLowerCase() === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500' :
                                order.status.toLowerCase() === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' :
                                    order.status.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500' :
                                        'bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-400'
                        }`}>
                        {order.status}
                    </span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
}
