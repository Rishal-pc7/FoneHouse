'use client';
import { updateCartItemQuantity, removeCartItem } from '@/services/cart';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
// Define manual type to avoid Decimal serialization issues
interface SerializedCart {
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
            price: number; // transformed to number
            img: string;
            category: string;
            isInStock: boolean;
            brand: string;
            created_at: Date;
        };
    }[];
}

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
    let tax = totalPrice * 0.15; // Assuming 15% VAT
    let finalTotal = totalPrice + tax;
    useEffect(() => {
        tax = totalPrice * 0.15; // Assuming 15% VAT
        finalTotal = totalPrice + tax;
    }, [totalPrice])

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
                        ({cartCount} items)
                    </span>
                </h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="grow space-y-4">
                        {cart?.CartItem?.map((item) => (
                            <Card key={item.id} className="border-gray-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6">
                                        {/* Product Image */}
                                        <div className="relative w-full sm:w-28 aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0">
                                            <Image
                                                src={item.Products.img}
                                                alt={item.Products.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="grow w-full">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-sm text-brandBlue font-medium uppercase tracking-wide mb-1">
                                                        {item.Products.category}
                                                    </p>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                                                        <Link href={`/shop/${item.id}`} className="hover:underline">
                                                            {item.Products.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <button
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    aria-label="Remove item"
                                                    onClick={() => handleRemoveClick(item.id)}
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                                                <div className="font-bold text-xl">
                                                    SAR {new Intl.NumberFormat('en-SA').format(item.Products.price)}
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 rounded-lg p-1 border border-gray-200 dark:border-zinc-700">
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
                                                        disabled={(quantity.find((q) => q.id === item.productId)?.quantity ?? 1) <= 1}
                                                        onClick={() => handleUpdateQuantity(item.id, -1, item.productId, item.Products.price)}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                                                        {
                                                            quantity.find((q) => q.id === item.productId)?.quantity
                                                        }
                                                    </span>
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors"
                                                        onClick={() => handleUpdateQuantity(item.id, 1, item.productId, item.Products.price)}
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96 shrink-0">
                        <div className="sticky top-24">
                            <Card className="border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
                                <CardContent className="p-6 md:p-8">
                                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Subtotal</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                SAR {new Intl.NumberFormat('en-SA').format(totalPrice)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Tax (15%)</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                SAR {new Intl.NumberFormat('en-SA').format(tax)}
                                            </span>
                                        </div>
                                        <div className="h-px bg-gray-200 dark:bg-zinc-800 my-4" />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-brandBlue">
                                                SAR {new Intl.NumberFormat('en-SA').format(finalTotal)}
                                            </span>
                                        </div>
                                    </div>

                                    <Button className="w-full h-14 text-lg font-bold rounded-xl bg-brandBlue hover:bg-brandBlue/90 shadow-lg shadow-brandBlue/20 group">
                                        Checkout
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                    </Button>

                                    <div className="mt-4 text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Shipping & taxes calculated at checkout
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
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
