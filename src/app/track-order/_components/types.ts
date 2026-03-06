import { Decimal, JsonValue } from "@prisma/client/runtime/client";

export type OrderItem = {
    orderId: number;
    id: number;
    productId: number;
    quantity: number;
    Products: Products;
};
export type Products={
    id: number;
    created_at: Date;
    name: string;
    brand: string;
    stock: number;
    isInStock: boolean;
    price: number;
    category: string;
    img: string;
    description: string | null;
    specifications: JsonValue | null;
}
export type Order = {
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
   created_at: Date;
   OrderItem: OrderItem[];
};
