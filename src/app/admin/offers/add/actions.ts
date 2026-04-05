'use server'

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOffer(formData: FormData) {
    const couponCode = formData.get('couponCode') as string;
    const discountPercentage = parseInt(formData.get('discountPercentage') as string, 10);
    const isActive = formData.get('isActive') === 'on';

    const expiryDateStr = formData.get('expiryDate') as string;
    const expiryDate = expiryDateStr ? new Date(expiryDateStr) : null;

    const startDateStr = formData.get('startDate') as string;
    const startDate = startDateStr ? new Date(startDateStr) : null;

    const minCartValueStr = formData.get('minCartValue') as string;
    const minCartValue = minCartValueStr ? parseFloat(minCartValueStr) : null;

    const applicableProductsStr = formData.get('applicableProducts') as string;
    const applicableProducts = applicableProductsStr 
        ? applicableProductsStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n))
        : [];

    if (!couponCode || isNaN(discountPercentage)) {
        throw new Error('Invalid form data');
    }

    await db.offer.create({
        data: {
            couponCode,
            discountPercentage,
            isActive,
            startDate,
            expiryDate,
            minCartValue,
            applicableProducts
        }
    });

    revalidatePath('/admin/offers');
    redirect('/admin/offers');
}
