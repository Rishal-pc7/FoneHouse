import User from 'lucide-react/dist/esm/icons/user';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import { OrderStatusUpdater } from './OrderStatusUpdater.client';
import { OrderWithDetails } from '../../admin-orders.types';

export default function OrderSummaryCards({ order }: { order: OrderWithDetails }) {
    return (
        <div className="space-y-6">
            {/* Status Updator */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Manage Status</h2>
                <OrderStatusUpdater orderId={order.id} initialStatus={order.status} />
            </div>

            {/* Customer Info */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brandBlue/10 rounded-lg text-brandBlue">
                        <User className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Customer details</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-semibold text-gray-900 dark:text-white mt-1">{order.firstName} {order.lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</p>
                        <p className="text-gray-900 dark:text-white mt-1">{order.email}</p>
                        <p className="text-gray-900 dark:text-white mt-1">{order.phone}</p>
                    </div>
                </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brandBlue/10 rounded-lg text-brandBlue">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Shipping address</h2>
                </div>
                <p className="text-gray-900 dark:text-white leading-relaxed">
                    {order.address}<br />
                    {order.city}<br />
                    {order.postalCode}
                </p>
            </div>

            {/* Payment Info */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment</h2>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Method</p>
                    <p className="font-semibold text-gray-900 dark:text-white mt-1 capitalize">{order.paymentMethod}</p>
                </div>
            </div>
        </div>
    );
}
