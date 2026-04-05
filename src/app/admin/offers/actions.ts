'use server'

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteOfferAction(id: number): Promise<boolean> {
    try {
        await db.offer.delete({
            where: { id }
        });
        revalidatePath('/admin/offers');
        return true;
    } catch (error) {
        console.error("Failed to delete offer:", error);
        return false;
    }
}
