import { AdminOrdersTable } from './admin-orders-table.client';
import db from '@/lib/db';
import { AdminOrder, OrderStatus } from './admin-orders.types';

export const metadata = {
    title: 'Admin Orders | FoneHouse',
    description: 'Manage store orders.',
};

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
    const dbOrders = await db.orders.findMany({
        orderBy: { created_at: 'desc' },
        include: {
            OrderItem: true,
        }
    });

    const formattedOrders: AdminOrder[] = dbOrders.map(order => ({
        id: order.id.toString(),
        customerName: order.firstName + ' ' + order.lastName,
        customerEmail: order.email,
        date: order.created_at.toISOString(),
        total: order.totalPrice.toNumber(),
        status: order.status.toLowerCase() as OrderStatus,
        items: order.OrderItem.reduce((acc, item) => acc + item.quantity, 0)
    }));

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

            <AdminOrdersTable initialOrders={formattedOrders} />
        </div>
    );
}
