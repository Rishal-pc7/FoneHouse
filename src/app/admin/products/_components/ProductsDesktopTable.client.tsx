'use client';

import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';
import { Product } from '../products.types';


interface Props {
    products: Product[];
    onDeleteClick: (id: number) => void;
}

export default function ProductsDesktopTable({ products, onDeleteClick }: Props) {
    return (
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
                            if (!product.isInStock || product.stock <= 0) status = 'out_of_stock';

                            return (
                                <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden border border-gray-100 dark:border-zinc-700">
                                            {product.img ? (
                                                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
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
                                            ${status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'}`}>
                                            {status === 'active' ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/admin/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-brandBlue hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors" title="Edit">
                                                <Edit size={18} />
                                            </Link>
                                            <button onClick={() => onDeleteClick(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors" title="Delete">
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
    );
}
