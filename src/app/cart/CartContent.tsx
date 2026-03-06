'use client';
import { updateCartItemQuantity, removeCartItem } from '@/services/cart';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { SerializedCart } from './cart.types';
import { CartItemClient } from './CartItem.client';
import { OrderSummaryClient } from './OrderSummary.client';
import dynamic from 'next/dynamic';

const Dialog = dynamic(() => import('@/components/ui/dialog').then(mod => mod.Dialog), { ssr: false });
const DialogContent = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogContent), { ssr: false });
const DialogHeader = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogHeader), { ssr: false });
const DialogTitle = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogTitle), { ssr: false });
const DialogDescription = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogDescription), { ssr: false });
const DialogFooter = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogFooter), { ssr: false });

import { Button } from '@/components/ui/button';
export default function CartContent({ cart }: { cart: SerializedCart | null }) {
    const { cartCount, setCount } = useCart();
    // Initialize state directly from props
    const [quantity, setQuantity] = useState<{ id: number, quantity: number }[]>(
        cart?.CartItem.map((item) => ({ id: item.productId, quantity: item.quantity })) || []
    );
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Calculate total price locally from the cart prop since it's removed from context
    const [totalPrice, setTotalPrice] = useState<number>(cart?.totalPrice || 0)

    // Cart actions placeholders - logic to be implemented by user
    // Cart actions
    const confirmDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);
        try {
            await removeCartItem(itemToDelete);

            // Update cart count
            const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
            const newCount = Math.max(0, currentCount - 1);
            localStorage.setItem('cartCount', newCount.toString());
            setCount(newCount);

            // Reload page to reflect changes
            window.location.reload();
        } catch (error) {
            console.error(error);
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            // Optionally show error toast here
        }
    };

    const handleRemoveClick = (id: number) => {
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleUpdateQuantity = async (id: number, quantityChange: number, productId: number, price: number) => {
        const currentQtyItem = quantity.find((q) => q.id === productId);
        const currentQty = currentQtyItem ? currentQtyItem.quantity : 1;
        const newQty = currentQty + quantityChange;

        // Prevent going below 1
        if (newQty < 1) return;

        // Optimistic update
        setQuantity((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity: newQty } : item
            )
        );
        setTotalPrice((prev) => prev + (quantityChange * price));

        try {
            const data = await updateCartItemQuantity(id, quantityChange, productId);
            if (data?.data?.totalPrice !== undefined) {
                setTotalPrice(data.data.totalPrice);
            }
        } catch (error) {
            console.error(error);
            // Revert on error
            setQuantity((prev) =>
                prev.map((item) =>
                    item.id === productId ? { ...item, quantity: currentQty } : item
                )
            );
            setTotalPrice((prev) => prev - (quantityChange * price));
        }
    };
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
                    Shopping Cart
                    <span className="ml-3 text-lg font-medium text-gray-500 dark:text-gray-400">
                        ({cart?.totalItems} items)
                    </span>
                </h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="grow space-y-4">
                        {cart?.CartItem?.map((item, index) => (
                            <CartItemClient
                                key={item.id}
                                item={item}
                                quantity={quantity.find((q) => q.id === item.productId)?.quantity ?? 1}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemoveClick={handleRemoveClick}
                                priority={index === 0}
                            />
                        ))}
                    </div>

                    <div className="lg:w-96 shrink-0">
                        <div className="sticky top-24">
                            <OrderSummaryClient
                                totalPrice={totalPrice}
                                cartId={cart?.id || 0}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Item</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove this item from your cart?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Removing...' : 'Remove'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}
