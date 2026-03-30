export interface OrderData {
    id: number;
    userId: number | null;
    sessionId: string | null;
    totalPrice: number;
    cartId: number;
    status: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    paymentMethod: string;
    created_at: string;
    updated_at: string;
    OrderItem: Array<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
    }>;
}

export interface UserSessionData {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
}
