import { AdminOrder } from './admin-orders.types';

export const dummyOrders: AdminOrder[] = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        date: '2026-03-08T10:00:00Z',
        total: 1299.99,
        status: 'processing',
        items: 2,
    },
    {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@example.com',
        date: '2026-03-07T14:30:00Z',
        total: 599.50,
        status: 'shipped',
        items: 1,
    },
    {
        id: 'ORD-003',
        customerName: 'Alice Johnson',
        customerEmail: 'alice.j@example.com',
        date: '2026-03-06T09:15:00Z',
        total: 2450.00,
        status: 'delivered',
        items: 3,
    },
    {
        id: 'ORD-004',
        customerName: 'Bob Brown',
        customerEmail: 'bob.b@example.com',
        date: '2026-03-08T11:45:00Z',
        total: 89.99,
        status: 'processing',
        items: 1,
    },
    {
        id: 'ORD-005',
        customerName: 'Charlie Davis',
        customerEmail: 'cdavis@example.com',
        date: '2026-03-05T16:20:00Z',
        total: 450.00,
        status: 'delivered',
        items: 2,
    }
];
