'use server'

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOffer(formData: FormData) {
    const couponCode = formData.get('couponCode') as string;
    const discountPercentage = parseInt(formData.get('discountPercentage') as string, 10);
    const isActive = formData.get('isActive') === 'on';

    if (!couponCode || isNaN(discountPercentage)) {
        throw new Error('Invalid form data');
    }

    await db.offer.create({
        data: {
            couponCode,
            discountPercentage,
            isActive
        }
    });

    revalidatePath('/admin/offers');
    redirect('/admin/offers');
}
