import { z } from 'zod';
import { JsonValue } from '@prisma/client/runtime/client';

export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: string;
    brand: string;
    stock: number;
    isInStock: boolean;
    img: string;
    images: string[];
    created_at: Date;
    specifications: JsonValue;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters').or(z.literal('')).nullish(),
    price: z.number().min(0.01, 'Price must be greater than 0'),
    category: z.string().min(1, 'Category is required'),
    brand: z.string().min(1, 'Brand is required'),
    stock: z.number().int().min(0, 'Stock cannot be negative'),
    isInStock: z.boolean(),
    img: z.union([

        z.any()
            .refine((files) => files?.length >= 1, { message: 'Main image is required.' })
            .refine((files) => files?.[0]?.size <= 1.5 * 1024 * 1024, {
                message: 'Max file size is 1.5MB.',
            })
            .refine(
                (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                { message: 'Only .jpg, .jpeg, .png and .webp formats are supported.' }
            ),
        z.string().min(1, "Display Image is required")
    ]),
    images: z.any()
        .refine((files) => !files || files.length === 0 || files.length <= 3, {
            message: 'You can upload a maximum of 3 images.'
        })
        .refine(
            (files) => {
                if (!files || files.length === 0) return true;
                return Array.from(files).every((file: any) => {
                    if (typeof file === 'string') return true;
                    return file.size <= 1024 * 1024;
                });
            },
            { message: 'Every image must be less than 1MB.' }
        )
        .refine(
            (files) => {
                if (!files || files.length === 0) return true;
                return Array.from(files).every((file: any) => {
                    if (typeof file === 'string') return true;
                    return ACCEPTED_IMAGE_TYPES.includes(file.type);
                });
            },
            { message: 'Only .jpg, .jpeg, .png and .webp formats are supported.' }
        ).optional(),
    specifications: z.union([z.record(z.string(), z.string()), z.array(z.string())]).nullish(),
});

export type ProductFormData = z.infer<typeof productSchema>;
