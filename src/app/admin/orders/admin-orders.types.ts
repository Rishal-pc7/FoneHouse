import { Orders, OrderItem, Products } from '@/generated/prisma/client';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface AdminOrder {
    id: string;
    customerName: string;
    customerEmail: string;
    date: string;
    total: number;
    status: OrderStatus;
    items: number;
}

export type OrderWithDetails = Orders & {
    OrderItem: (OrderItem & {
        Products: Products;
    })[];
};
export type orderItem=OrderItem & {Products:Products}