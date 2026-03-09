export type OrderStatus = 'processing' | 'shipped' | 'delivered';

export interface AdminOrder {
    id: string;
    customerName: string;
    customerEmail: string;
    date: string;
    total: number;
    status: OrderStatus;
    items: number;
}
