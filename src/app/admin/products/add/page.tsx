'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import SpecsEditor from '@/components/admin/SpecsEditor'

// Define the validation schema
const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().min(0.01, 'Price must be greater than 0'),
    category: z.string().min(1, 'Category is required'),
    brand: z.string().min(1, 'Brand is required'),
    stock: z.number().int().min(0, 'Stock cannot be negative'),
    isInStock: z.boolean(),
    imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
    specs: z.union([z.record(z.string(), z.string()), z.array(z.string())]).optional(),
})

type ProductFormData = z.infer<typeof productSchema>

export default function AddProductPage() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            isInStock: true
        }
    })

    const onSubmit = async (data: ProductFormData) => {
        // Simulate API call
        console.log('Submitting Product:', data)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        alert('Product added successfully!')
        reset()
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Create a new product listing for your store.
                </p>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2 border-gray-100 dark:border-zinc-800">Basic Information</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Product Name
                        </label>
                        <input
                            {...register('name')}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all`}
                            placeholder="e.g. iPhone 15 Pro Max"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all`}
                            placeholder="Detailed product description..."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Price (SAR)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('price', { valueAsNumber: true })}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.price ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                    } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all`}
                                placeholder="0.00"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Stock Quantity
                            </label>
                            <div className="space-y-3">
                                <input
                                    type="number"
                                    {...register('stock', { valueAsNumber: true })}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.stock ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                        } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all`}
                                    placeholder="0"
                                />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isInStock"
                                        {...register('isInStock')}
                                        className="w-4 h-4 text-brandBlue border-gray-300 rounded focus:ring-brandBlue dark:border-zinc-700 dark:bg-zinc-800"
                                    />
                                    <label htmlFor="isInStock" className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Mark as In Stock
                                    </label>
                                </div>
                            </div>
                            {errors.stock && (
                                <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                {...register('category')}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                    } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all appearance-none`}
                            >
                                <option value="">Select Category</option>
                                <option value="phones">Mobile Phones</option>
                                <option value="accessories">Accessories</option>
                                <option value="parts">Spare Parts</option>
                                <option value="maintenance">Maintenance Service</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Brand
                            </label>
                            <select
                                {...register('brand')}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.brand ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                    } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all appearance-none`}
                            >
                                <option value="">Select Brand</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                                <option value="xiaomi">Xiaomi</option>
                                <option value="huawei">Huawei</option>
                            </select>
                            {errors.brand && (
                                <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Image URL
                        </label>
                        <div className="relative">
                            <input
                                {...register('imageUrl')}
                                className={`w-full px-4 py-3 pl-10 rounded-lg border ${errors.imageUrl ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                    } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all`}
                                placeholder="https://example.com/image.jpg"
                            />
                            <Upload className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                        </div>

                        {errors.imageUrl && (
                            <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Specifications</h2>
                    <div className="bg-gray-50 dark:bg-zinc-800/30 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <Controller
                            name="specs"
                            control={control}
                            render={({ field }) => (
                                <SpecsEditor
                                    onChange={field.onChange}
                                    initialData={field.value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brandBlue text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Saving Product...</span>
                            </>
                        ) : (
                            'Save Product'
                        )}
                    </button>
                </div>
            </motion.form>
        </div>
    )
}
