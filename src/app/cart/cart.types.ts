export interface SerializedCart {
    id: number;
    userId: number | null;
    sessionId: string | null;
    totalPrice: number;
    totalItems: number;
    CartItem: {
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
        Products: {
            id: number;
            name: string;
            price: number;
            img: string;
            category: string;
            isInStock: boolean;
            brand: string;
            created_at: Date;
        };
    }[];
}
