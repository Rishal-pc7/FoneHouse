import { dummyOrders } from './admin-orders.data';
import { AdminOrdersTable } from './admin-orders-table.client';

export const metadata = {
    title: 'Admin Orders | FoneHouse',
    description: 'Manage store orders.',
};

export default function AdminOrdersPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        View and manage customer orders.
                    </p>
                </div>
            </div>

            <AdminOrdersTable initialOrders={dummyOrders} />
        </div>
    );
}
