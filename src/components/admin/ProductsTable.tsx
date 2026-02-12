'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JsonValue } from '@prisma/client/runtime/client';

type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number; // Decimal type handling
    category: string;
    brand: string;
    stock: number;
    isInStock: boolean;
    img: string;
    created_at: Date;
    specifications: JsonValue;
};

interface ProductsTableProps {
    initialProducts: Product[];
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProductsTable({ initialProducts }: ProductsTableProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const router = useRouter();

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            setIsLoading(true);
            const response = await fetch(`/api/deleteProduct/${deleteId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            setProducts(prev => prev.filter(p => p.id !== deleteId));
            setDeleteId(null);
            router.refresh();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage your product catalog and inventory.
                    </p>
                </div>
                <Link
                    href="/admin/products/add"
                    className="inline-flex items-center gap-2 bg-brandBlue text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-brandBlue/20 hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus size={20} />
                    <span>Add Product</span>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-brandBlue/50 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-900">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    {/* Placeholder for more actions */}
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white w-20">Image</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Product Name</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Category</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Price</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Stock</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {products.map((product) => {
                                let status: 'active' | 'out_of_stock' = 'active';
                                if (!product.isInStock || product.stock <= 0) {
                                    status = 'out_of_stock';
                                }

                                return (
                                    <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden border border-gray-100 dark:border-zinc-700">
                                                {product.img ? (
                                                    <img
                                                        src={product.img}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-xs font-medium">
                                                {product.brand}
                                                <span className="w-1 h-1 rounded-full bg-gray-400" />
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            SAR {new Intl.NumberFormat('en-SA').format(product.price)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                                                <span className="text-gray-600 dark:text-gray-300">{product.stock} units</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                                ${status === 'active'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                    : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                                                }`}>
                                                {status === 'active' ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/products/edit/${product.id}`}
                                                    className="p-2 text-gray-400 hover:text-brandBlue hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(product.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {products.map((product) => {
                    let status: 'active' | 'out_of_stock' = 'active';
                    if (!product.isInStock || product.stock <= 0) {
                        status = 'out_of_stock';
                    }

                    return (
                        <div key={product.id} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden border border-gray-100 dark:border-zinc-700 shrink-0">
                                        {product.img ? (
                                            <img
                                                src={product.img}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">{product.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Price</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">SAR {new Intl.NumberFormat('en-SA').format(product.price)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Stock</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                                        <span className="text-gray-700 dark:text-gray-200">{product.stock}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                    ${status === 'active'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                        : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                                    }`}>
                                    {status === 'active' ? 'In Stock' : 'Out of Stock'}
                                </span>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/products/edit/${product.id}`}
                                        className="p-2 bg-gray-50 dark:bg-zinc-800 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick(product.id)}
                                        className="p-2 bg-gray-50 dark:bg-zinc-800 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteId(null)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
