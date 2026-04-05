"use server";

import prisma from "@/lib/db";
import { CheckoutFormValues } from "./checkout.types";

export async function getPendingOrderAction(orderIdStr: string,): Promise<Partial<CheckoutFormValues> | null> {
    const parts = orderIdStr.split('-');
    const orderId = parseInt(parts[1], 10);
    if (!orderId) return null;

    try {
        const order = await prisma.orders.findUnique({
            where: { id: orderId }
        });
        
        if (!order) return null;

        // Map database fields back to form values
        return {
            email: order.email,
            firstName: order.firstName,
            lastName: order.lastName,
            address: order.address,
            city: order.city,
            postalCode: order.postalCode,
            phone: order.phone,
            // Assuming default or map string if needed
            paymentMethod: order.paymentMethod as 'cod' | 'prepaid', 
        };
    } catch (e) {
        console.error("Failed to fetch pending order:", e);
        return null;
    }
}

export async function deleteOrderAction(orderIdStr: string): Promise<boolean> {
    const parts = orderIdStr.split('-');
    const orderId = parseInt(parts[1], 10);
    if (!orderId) return false;

    try {
        // Prisma transaction to safely delete related OrderItems first
        await prisma.$transaction([
            prisma.orderItem.deleteMany({
                where: { orderId }
            }),
            prisma.orders.delete({
                where: { id: orderId }
            })
        ]);
        return true;
    } catch (e) {
        console.error("Failed to delete order logic:", e);
        return false;
    }
}

export interface CouponValidationResult {
    isValid: boolean;
    discountPercentage?: number;
    message?: string;
}

export async function validateCouponAction(code: string, cartTotal: number, productIds: number[]): Promise<CouponValidationResult> {
    try {
        const offer = await prisma.offer.findUnique({
            where: { couponCode: code }
        });

        if (!offer) {
            return { isValid: false, message: "Invalid coupon code." };
        }

        if (!offer.isActive && !offer.startDate) {
            return { isValid: false, message: "This coupon is no longer active." };
        }

        if (!offer.isActive && offer.startDate && new Date() < offer.startDate) {
            return { isValid: false, message: "This coupon is not active yet." };
        }

        if (offer.expiryDate && new Date() > offer.expiryDate) {
            return { isValid: false, message: "This coupon has expired." };
        }

        if (offer.minCartValue && cartTotal < Number(offer.minCartValue)) {
            return { isValid: false, message: `This coupon requires a minimum cart value of SAR ${offer.minCartValue}.` };
        }

        if (offer.applicableProducts.length > 0) {
            const hasApplicableProduct = productIds.some(id => offer.applicableProducts.includes(id));
            if (!hasApplicableProduct) {
                return { isValid: false, message: "This coupon does not apply to any products in your cart." };
            }
        }

        return { 
            isValid: true, 
            discountPercentage: offer.discountPercentage,
            message: "Coupon applied successfully!"
        };

    } catch (e) {
        console.error("Failed to validate coupon:", e);
        return { isValid: false, message: "An error occurred while validating the coupon." };
    }
}

export async function getAvailableCouponsAction() {
    try {
        const currentDate = new Date();
        const offers = await prisma.offer.findMany({
            where: {
                isActive: true,
                OR: [
                    { startDate: null },
                    { startDate: { lte: currentDate } }
                ],
                AND: [
                    {
                        OR: [
                            { expiryDate: null },
                            { expiryDate: { gte: currentDate } }
                        ]
                    }
                ]
            },
            select: {
                id: true,
                couponCode: true,
                discountPercentage: true,
                minCartValue: true,
            }
        });
        
        // Transform the minCartValue to number for the client
        return offers.map(offer => ({
            id: offer.id,
            couponCode: offer.couponCode,
            discountPercentage: offer.discountPercentage,
            minCartValue: offer.minCartValue ? Number(offer.minCartValue) : null
        }));
    } catch (e) {
        console.error("Failed to fetch available coupons:", e);
        return [];
    }
}
