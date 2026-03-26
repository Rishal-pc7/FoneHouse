export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    img: string;
    category: string;
    brand: string;
    stock: number;
    isInStock: boolean;
    created_at: Date;
};
