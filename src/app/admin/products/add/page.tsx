import AddProductForm from './_components/AddProductForm.client'

export const dynamic = 'force-dynamic';

export default function AddProductPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Create a new product listing for your store.
                </p>
            </div>

            <AddProductForm />
        </div>
    )
}
