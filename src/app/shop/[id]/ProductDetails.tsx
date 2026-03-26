import { Star, Check, ShieldCheck, Truck } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductDetailsProps {
    product: {
        id: number;
        name: string;
        category: string;
        description: any;
        price: number;
        specifications: any;
        warrantyYears?: number;
        shipping?: string;
        rating: number;
        reviewCount: number;
        Review: Review[];
    };
    isOutOfStock: boolean;
}

type Review = {
    id: number;
    rating: number;
    comment: string | null;
    productId: number;
    userId: number;
    username: string;
    createdAt: Date;
};

export default function ProductDetails({ product, isOutOfStock }: ProductDetailsProps) {
    return (
        <div className="flex flex-col justify-start space-y-8">
            <div>
                <span className="text-brandBlue font-semibold uppercase tracking-wider text-sm">
                    {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4 leading-tight">
                    {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => {
                            const fillPercentage = Math.max(0, Math.min(100, (Number(product.rating) - s + 1) * 100));
                            return (
                                <div key={s} className="relative">
                                    <Star size={18} className="text-gray-300 dark:text-zinc-700" />
                                    <div 
                                        className="absolute top-0 left-0 overflow-hidden text-amber-500" 
                                        style={{ width: `${fillPercentage}%` }}
                                    >
                                        <Star size={18} fill="currentColor" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {Number(product.rating || 0).toFixed(1)} ({product.reviewCount})
                    </span>
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description as React.ReactNode}
                </p>
            </div>

            <div className="border-t border-b border-gray-100 dark:border-zinc-800 py-6 space-y-4">
                <div className="flex items-end gap-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        SAR {new Intl.NumberFormat('en-SA').format(Number(product.price))}
                    </span>
                    {isOutOfStock && (
                        <span className="text-red-500 font-medium text-lg mb-1">
                            Sold Out
                        </span>
                    )}
                </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="text-brandBlue" size={20} />
                    <span>
                        {product.warrantyYears && product.warrantyYears > 0 
                            ? `${product.warrantyYears} Year${product.warrantyYears > 1 ? 's' : ''} Warranty` 
                            : 'No Warranty'}
                    </span>
                </div>
                
                <div className="flex items-center gap-3">
                    <Truck className="text-brandBlue" size={20} />
                    <span>
                        {product.shipping === 'PAID' ? 'Standard Delivery' : 'Free Delivery'}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Check className="text-brandBlue" size={20} />
                    <span>Original Product</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check className="text-brandBlue" size={20} />
                    <span>Secure Payment</span>
                </div>
            </div>

            {/* Specifications Section */}
            {product.specifications && (
                <div className="pt-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Technical Specifications</h3>
                    <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 md:p-8">
                        {Array.isArray(product.specifications) ? (
                            <ul className="space-y-3">
                                {product.specifications.map((spec: any, index: number) => (
                                    <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                                        <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-brandBlue rounded-full shrink-0" />
                                        <span>{String(spec)}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="grid grid-cols-1 gap-y-4">
                                {Object.entries(product.specifications as Record<string, any>).map(([key, value]) => (
                                    <div key={key} className="grid grid-cols-3 gap-4 border-b border-gray-200 dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
                                        <dt className="text-gray-500 dark:text-gray-400 font-medium">{key}</dt>
                                        <dd className="col-span-2 text-gray-900 dark:text-white font-medium">{String(value)}</dd>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="flex gap-4">
                <AddToCartButton
                    productId={product.id}
                    isOutOfStock={isOutOfStock}
                    price={Number(product.price)}
                    className={`flex-1 rounded-full text-lg h-14 text-white shadow-xl transition-all
                        ${isOutOfStock
                            ? 'bg-gray-400 cursor-not-allowed shadow-none hover:bg-gray-400' // Override/Merge styles
                            : 'bg-brandBlue hover:bg-blue-700 shadow-blue-500/20'
                        }`}
                />
            </div>
        </div>
    );
}
