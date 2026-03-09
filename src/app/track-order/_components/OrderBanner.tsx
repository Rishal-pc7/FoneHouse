import OrderProgress from "./OrderProgress";
import OrderStatusBadge from "./OrderStatusBadge";
import { STATUS_STEPS, SPECIAL_STATUSES } from "./data";

type Props = { order: any };

export default function OrderBanner({ order }: Props) {
    const isSpecial = order.status in SPECIAL_STATUSES;
    const currentStatusIndex = STATUS_STEPS.findIndex(s => s.id === order.status);

    return (
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-xl mb-8">
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border/50 gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-urbanist">Order #{order.id}</h2>
                    <p className="text-muted-foreground">Placed on {order.date}</p>
                </div>
                <div className="text-left md:text-right">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-1">
                        Expected Delivery
                    </p>
                    <p className="text-2xl font-bold text-foreground font-urbanist">
                        {order.estimatedDelivery}
                    </p>
                </div>
            </div>

            {isSpecial ? (
                <OrderStatusBadge status={order.status} />
            ) : (
                <OrderProgress currentStatusIndex={currentStatusIndex} />
            )}
        </div>
    );
}
