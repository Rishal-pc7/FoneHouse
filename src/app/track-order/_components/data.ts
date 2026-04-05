import { Package, Truck, Check, Clock, XCircle } from "lucide-react";



export const STATUS_STEPS = [
    { id: "PAID", label: "Order Placed", icon: Package },
    { id: "SHIPPED", label: "Shipped", icon: Truck },
    { id: "DELIVERED", label: "Delivered", icon: Check },
];

export function getStatusColor(status: string): string {
    if (status === "DELIVERED") return "bg-brandGreen";
    if (status === "SHIPPED") return "bg-amber-500";
    if (status === "CANCELLED") return "bg-red-500";
    if (status === "PENDING") return "bg-zinc-500";
    return "bg-brandBlue";
}

export function getStatusBorderColor(status: string): string {
    if (status === "DELIVERED") return "border-brandGreen/30";
    if (status === "SHIPPED") return "border-amber-500/30";
    if (status === "CANCELLED") return "border-red-500/30";
    if (status === "PENDING") return "border-zinc-500/30";
    return "border-brandBlue/30";
}

/** Statuses that don't fit the linear progress tracker */
export const SPECIAL_STATUSES: Record<string, { label: string; description: string; icon: any; color: string; border: string }> = {
    PENDING: {
        label: "Pending",
        description: "Your order has been received and is awaiting confirmation.",
        icon: Clock,
        color: "text-zinc-400",
        border: "border-zinc-500/30",
    },
    CANCELLED: {
        label: "Cancelled",
        description: "This order has been cancelled. Please contact support if you have questions.",
        icon: XCircle,
        color: "text-red-400",
        border: "border-red-500/30",
    },
};
