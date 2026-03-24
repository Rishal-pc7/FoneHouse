import * as z from 'zod';

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

export const checkoutFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    firstName: z.string().min(2, { message: 'First name is required' }),
    lastName: z.string().min(2, { message: 'Last name is required' }),
    address: z.string().min(5, { message: 'Address is required' }),
    city: z.string().min(2, { message: 'City is required' }),
    postalCode: z.string().min(3, { message: 'Postal code is required' }),
    phone: z.string().min(9, { message: 'Valid phone number is required' }),
    paymentMethod: z.enum(['cod', 'prepaid'] as const, {
        message: 'Please select a payment method',
    }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
