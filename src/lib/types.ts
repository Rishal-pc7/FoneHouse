
import { JsonValue } from '@prisma/client/runtime/client';

export interface Product {
    id: number;
    name: string;
    brand: string;
    stock: number;
    isInStock: boolean;
    description: string | null;
    price: number;
    category: string;
    img: string;
    created_at: string;
    specifications: JsonValue;
}

export interface CartItem extends Product {
    quantity: number;
}
