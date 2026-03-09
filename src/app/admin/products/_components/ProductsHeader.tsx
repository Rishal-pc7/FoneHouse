import Link from 'next/link';
import Plus from 'lucide-react/dist/esm/icons/plus';

export default function ProductsHeader() {
    return (
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
    );
}
