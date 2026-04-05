'use client';

import Link from 'next/link';
import Edit from 'lucide-react/dist/esm/icons/edit';
import Trash from 'lucide-react/dist/esm/icons/trash';
import MoreVertical from 'lucide-react/dist/esm/icons/more-vertical';
import { Product } from '../products.types';


interface Props {
    products: Product[];
    onDeleteClick: (id: number) => void;
}

export default function ProductsMobileTable({ products, onDeleteClick }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {products.map((product) => {
                let status: 'active' | 'out_of_stock' = 'active';
                if (!product.isInStock || product.stock <= 0) status = 'out_of_stock';

                return (
                    <div key={product.id} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden border border-gray-100 dark:border-zinc-700 shrink-0">
                                    {product.img ? (
                                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
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
                                ${status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'}`}>
                                {status === 'active' ? 'In Stock' : 'Out of Stock'}
                            </span>

                            <div className="flex gap-2">
                                <Link href={`/admin/products/edit/${product.id}`} className="p-2 bg-gray-50 dark:bg-zinc-800 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                    <Edit size={16} />
                                </Link>
                                <button onClick={() => onDeleteClick(product.id)} className="p-2 bg-gray-50 dark:bg-zinc-800 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                                    <Trash size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
