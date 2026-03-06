import { Package, Truck, Check } from "lucide-react";
import type { Order } from "./types";

export const DUMMY_ORDER = {
    id: "ORD-84392XL",
    date: "Oct 24, 2026",
    status: "shipped",
    estimatedDelivery: "Oct 28, 2026",
    customer: {
        name: "Alex Designer",
        email: "alex@example.com",
        address: "123 Aesthetic Avenue, Design District, NY 10001",
        phone: "+1 (555) 123-4567",
    },
    items: [
        {
            id: 1,
            name: "iPhone 16 Pro Max - 256GB Desert Titanium",
            price: 1199.00,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=300",
        },
        {
            id: 2,
            name: "MagSafe Silicone Case - Clay",
            price: 49.00,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1611472173362-3f53c9e6bb92?auto=format&fit=crop&q=80&w=300",
        },
    ],
    subtotal: 1248.00,
    shipping: 0.00,
    tax: 109.20,
    total: 1357.20,
} as unknown as Order;

export const STATUS_STEPS = [
    { id: "placed", label: "Order Placed", icon: Package },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "delivered", label: "Delivered", icon: Check },
];

export function getStatusColor(status: string): string {
    if (status === "delivered") return "bg-brandGreen";
    if (status === "processing") return "bg-amber-500";
    return "bg-brandBlue";
}

export function getStatusBorderColor(status: string): string {
    if (status === "delivered") return "border-brandGreen/30";
    if (status === "processing") return "border-amber-500/30";
    return "border-brandBlue/30";
}
