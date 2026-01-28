import React from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Edit, Trash } from 'lucide-react';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await db.products.findMany({
        orderBy: { created_at: 'desc' }
    });

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

            {/* Products Table */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white w-20">Image</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Product Name</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white hidden md:table-cell">Category</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Price</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white hidden sm:table-cell">Stock</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {products.map((product) => {
                                // Status Logic
                                let status: 'active' | 'out_of_stock' | 'archived' = 'active';
                                if (!product.isInStock || product.stock <= 0) {
                                    status = 'out_of_stock';
                                }
                                // You might assume 'archived' logic separately or if stock is hidden etc.

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
                                                <span className="text-xs text-gray-500 dark:text-gray-400 md:hidden">{product.brand}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-xs font-medium">
                                                {product.brand}
                                                <span className="w-1 h-1 rounded-full bg-gray-400" />
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            SAR {Number(product.price).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
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
                                                {/* Removed View (Eye) Icon */}
                                                <Link
                                                    href={`/admin/products/edit/${product.id}`}
                                                    className="p-2 text-gray-400 hover:text-brandBlue hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors" title="Delete">
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                            <button className="md:hidden p-2 text-gray-400">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder - Could be connected to real pagination later */}
                <div className="border-t border-gray-100 dark:border-zinc-800 p-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div>Showing All Products</div>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 border border-gray-200 dark:border-zinc-700 rounded-md disabled:opacity-50">Previous</button>
                        <button disabled className="px-3 py-1 border border-gray-200 dark:border-zinc-700 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
