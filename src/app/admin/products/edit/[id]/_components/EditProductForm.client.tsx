'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Upload from 'lucide-react/dist/esm/icons/upload';
import Trash from 'lucide-react/dist/esm/icons/trash';
import SpecsEditor from '@/components/admin/SpecsEditor'
import { useRouter } from 'next/navigation'
import { ProductFormData, productSchema } from '../../../products.types'
import { useEffect, useState } from 'react'

interface Props {
    id: number;
    initialData: ProductFormData;
}

export default function EditProductForm({ id, initialData }: Props) {
    const router = useRouter()
    const [mainImg, setMainImg] = useState<File | Blob | undefined>(undefined)
    const [additionalImages, setAdditionalImages] = useState<(File | string)[]>([])
    const [mainImgPreview, setMainImgPreview] = useState<string | undefined>(undefined)
    const [additionalImgPreviews, setAdditionalImgPreviews] = useState<string[]>([])
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData
    })

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);
    useEffect(() => {
        if (!mainImg) return
        const newMainImg = URL.createObjectURL(mainImg)
        setMainImgPreview(newMainImg)

        return () => {
            URL.revokeObjectURL(newMainImg)
        }
    }, [mainImg])
    useEffect(() => {
        const newAdditionalPreviews = additionalImages.map(file => {
            if (typeof (file) !== "string") {
                return URL.createObjectURL(file)
            }
            return file
        })
        setAdditionalImgPreviews(newAdditionalPreviews)

        return () => {
            newAdditionalPreviews.forEach(file => {
                if (typeof (file) !== "string") {
                    URL.revokeObjectURL(file)
                }
            }
            )
        }
    }, [additionalImages])
    useEffect(() => {
        const mainImgPreview = watch("img") || ""
        const additionalImgPreviews = (watch("images") as string[]) || []
        setMainImgPreview(mainImgPreview)
        setAdditionalImgPreviews(additionalImgPreviews)
        setAdditionalImages(additionalImgPreviews)
    }, [])
    const onSubmit = async (data: ProductFormData) => {
        try {
            const validatedData = productSchema.parse(data)
            const formData = new FormData();
            formData.append('name', validatedData.name);
            if (validatedData.description) formData.append('description', validatedData.description);
            formData.append('price', validatedData.price.toString());
            formData.append('category', validatedData.category);
            formData.append('brand', validatedData.brand);
            formData.append('stock', validatedData.stock.toString());
            formData.append('isInStock', validatedData.isInStock.toString());

            if (validatedData.specifications) {
                formData.append('specifications', JSON.stringify(validatedData.specifications));
            }

            // main image
            const imgVal = validatedData.img;
            if (typeof imgVal === 'string') {
                formData.append('existing_img', imgVal);
            } else if (imgVal?.[0]) {
                formData.append('img', imgVal[0]);
            }

            // additional images
            if (validatedData.images) {
                Array.from(validatedData.images).forEach((item: any) => {
                    if (typeof item === 'string') {
                        formData.append('existing_images', item);
                    } else if (item.size > 0) {
                        formData.append('images', item);
                    }
                });
            }

            const result = await fetch(`/api/admin/updateProduct/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (result.ok) {
                router.push("/admin/products")
            } else {
                console.error("Failed to update product");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2 border-gray-100 dark:border-zinc-800">Basic Information</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                    <input
                        {...register('name')}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                            } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all`}
                        placeholder="e.g. iPhone 15 Pro Max"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                            } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all`}
                        placeholder="Detailed product description..."
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (SAR)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('price', { valueAsNumber: true })}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.price ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all`}
                            placeholder="0.00"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Quantity</label>
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
                                <label htmlFor="isInStock" className="text-sm text-gray-600 dark:text-gray-400 font-medium">Mark as In Stock</label>
                            </div>
                        </div>
                        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                        <select
                            {...register('category')}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all appearance-none`}
                        >
                            <option value="">Select Category</option>
                            <option value="Mobile Phones">Mobile Phones</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Spare Parts">Spare Parts</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand</label>
                        <select
                            {...register('brand')}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.brand ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'
                                } bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none transition-all appearance-none`}
                        >
                            <option value="">Select Brand</option>
                            <option value="Apple">Apple</option>
                            <option value="Samsung">Samsung</option>
                            <option value="Xiaomi">Xiaomi</option>
                            <option value="Google">Google</option>
                            <option value="Huawei">Huawei</option>
                        </select>
                        {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
                    </div>
                </div>

                {/* Main and Additional Images Upload Section */}
                {(() => {
                    const mainImage = watch('img') || '';
                    const additionalImgs = (watch('images') as string[]) || [];
                    return (
                        <div className="space-y-6 bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Product Images</h3>

                            {/* Main Image */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Main Display Image (Required)</label>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    This image will be shown on the shop page and as the primary product image.
                                    {mainImage && <span className="block mt-1 text-brandBlue dark:text-blue-400 font-medium">Remove the existing image to add a new one.</span>}
                                </p>

                                {!mainImgPreview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-40 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-brandBlue hover:bg-white dark:hover:bg-zinc-800 cursor-pointer transition-all">
                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload main image</span>
                                        <input
                                            type="file" accept="image/*" className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                setMainImg(file)
                                                setValue('img', e.target.files, { shouldValidate: true, shouldDirty: true });
                                            }}
                                        />
                                    </label>
                                ) : (
                                    <div className="relative w-40 h-40 rounded-xl border border-gray-200 dark:border-zinc-700 group overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                                        <img src={mainImgPreview} alt="Main" className="object-cover w-full h-full" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMainImg(undefined)
                                                setMainImgPreview("")
                                                setValue('img', '', { shouldValidate: true, shouldDirty: true })
                                            }
                                            }
                                            className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm backdrop-blur-sm"
                                        >
                                            <Trash size={16} />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-brandBlue/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider text-center py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Main Image
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="h-px bg-gray-200 dark:bg-zinc-700 w-full" />

                            {/* Additional Images */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Additional Images (Optional)</label>
                                <p className="text-xs text-brandBlue dark:text-blue-400 font-medium mb-3">
                                    You can select multiple images at once to show different angles or details of the product.
                                </p>

                                <label className="flex flex-col items-center justify-center w-full h-32 px-4 py-3 mb-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-brandBlue hover:bg-white dark:hover:bg-zinc-800 cursor-pointer transition-all">
                                    <Upload className="w-6 h-6 text-brandBlue mb-2" />
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload multiple additional images</span>
                                    <span className="text-xs text-brandBlue/70 dark:text-blue-400 mt-1 font-semibold">Multiple selection allowed</span>
                                    <input
                                        type="file" multiple accept="image/*" className="hidden"
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (!files) return;
                                            let newImages: (File | string)[] = [...additionalImages];
                                            Array.from(files).forEach(file => {
                                                newImages.push(file)
                                            });
                                            setAdditionalImages(newImages)
                                            setValue("images", newImages, { shouldValidate: true, shouldDirty: true })
                                        }}
                                    />
                                </label>

                                {additionalImgPreviews.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {additionalImgPreviews.map((src, i) => (
                                            <div key={i} className="relative aspect-square w-full rounded-xl border border-gray-200 dark:border-zinc-700 group overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                                                <img src={src} alt={`Additional ${i + 1}`} className="object-cover w-full h-full" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newAdd = additionalImages.filter((_, idx) => idx !== i);
                                                        setAdditionalImages(newAdd)

                                                        setValue('images', newAdd, { shouldValidate: true, shouldDirty: true });
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm backdrop-blur-sm"
                                                >
                                                    <Trash size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {errors.img && <p className="text-red-500 text-sm mt-2">{errors.img?.message as string}</p>}
                        </div>
                    );
                })()}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Specifications</h2>
                <div className="bg-gray-50 dark:bg-zinc-800/30 p-1 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <Controller
                        name="specifications"
                        control={control}
                        render={({ field }) => (
                            <SpecsEditor onChange={field.onChange} initialData={field.value} />
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
                            <span>Updating Product...</span>
                        </>
                    ) : 'Update Product'}
                </button>
            </div>
        </motion.form>
    )
}
