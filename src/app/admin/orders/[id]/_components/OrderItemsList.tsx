import Package from 'lucide-react/dist/esm/icons/package';
import { orderItem, OrderWithDetails } from '../../admin-orders.types';

export default function OrderItemsList({ order }: { order: OrderWithDetails }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-3">
                <div className="p-2 bg-brandBlue/10 rounded-lg text-brandBlue">
                    <Package className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order Items ({order.OrderItem.reduce((acc: any, i: any) => acc + i.quantity, 0)})</h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                {order.OrderItem.map((item:orderItem ) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 overflow-hidden shrink-0">
                            {item.Products.img ? (
                                <img
                                    src={item.Products.img}
                                    alt={item.Products.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Package className="w-8 h-8" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                    {item.Products.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                                    {item.Products.brand} • {item.Products.category}
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-gray-600 dark:text-gray-300 font-medium">Qty: {item.quantity}</p>
                                <p className="font-bold text-brandBlue">${item.Products.price.toNumber().toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-6 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex items-center justify-between font-bold text-lg">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-brandBlue">${order.totalPrice.toNumber().toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
