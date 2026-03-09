import { notFound } from 'next/navigation';
import { getOrderDetails } from '../orders.actions';
import OrderHeader from './_components/OrderHeader';
import OrderItemsList from './_components/OrderItemsList';
import OrderSummaryCards from './_components/OrderSummaryCards';
import { OrderWithDetails } from '../admin-orders.types';

export const dynamic = 'force-dynamic';

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const orderId = parseInt(id.replace("ORD-", ""), 10);

    if (isNaN(orderId)) {
        return notFound();
    }

    const order = await getOrderDetails(orderId) as OrderWithDetails;

    if (!order) {
        return notFound();
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            <OrderHeader order={order} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <OrderItemsList order={order} />
                </div>

                <OrderSummaryCards order={order} />
            </div>
        </div>
    );
}
