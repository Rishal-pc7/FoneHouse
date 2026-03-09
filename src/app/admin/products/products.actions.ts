'use server';
import db from '@/lib/db';
import { ProductFormData, productSchema } from './products.types';
import { revalidatePath } from 'next/cache';



export async function addProduct(data: ProductFormData) {
    try {
        
    } catch (error) {
        console.error('Failed to add product:', error);
        return { success: false, error: 'Failed to add product' };
    }
}

export async function updateProduct(id: number, data: ProductFormData) {
    try {
        const validatedData = productSchema.parse(data);

        const updatedProduct = await db.products.update({
            where: { id },
            data: {
                ...validatedData,
                img: validatedData.img || "",
                description: validatedData.description || null,
                specifications: validatedData.specifications ? JSON.parse(JSON.stringify(validatedData.specifications)) : undefined,
            }
        });

        revalidatePath('/admin/products');
        return { success: true, product: updatedProduct };
    } catch (error) {
        console.error('Failed to update product:', error);
        return { success: false, error: 'Failed to update product' };
    }
}

export async function deleteProduct(id: number) {
    try {
        await db.products.delete({
            where: { id }
        });

        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete product:', error);
        return { success: false, error: 'Failed to delete product' };
    }
}
