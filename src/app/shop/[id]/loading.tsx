import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductCardSkeleton from "../_components/ProductCardSkeleton";

export default function Loading() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
            {/* Breadcrumb / Back Navigation */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/shop" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brandBlue transition-colors mb-6">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Shop
                </Link>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column - Image Gallery Skeleton */}
                    <div className="space-y-6 lg:sticky lg:top-24 h-fit">
                        <div className="flex flex-col lg:flex-row-reverse gap-4 lg:h-full lg:max-h-[600px]">
                            {/* Main Image Container */}
                            <div className="relative aspect-square w-full lg:w-4/5 lg:h-full rounded-3xl overflow-hidden shadow-sm shrink-0">
                                <Skeleton className="absolute inset-0 bg-gray-200 dark:bg-zinc-900" />
                            </div>

                            {/* Thumbnails */}
                            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden w-full lg:w-1/5 pb-2 lg:pb-0 hide-scrollbar">
                                {[1, 2, 3].map((index) => (
                                    <div key={`thumb-sk-${index}`} className="relative w-20 h-20 md:w-24 md:h-24 lg:w-full lg:h-24 lg:shrink-0 shrink-0 rounded-xl overflow-hidden border-2 border-transparent">
                                        <Skeleton className="absolute inset-0 bg-gray-200 dark:bg-zinc-900 opacity-70" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Details Skeleton */}
                    <div className="flex flex-col justify-start space-y-8 animate-pulse">
                        <div>
                            {/* Category */}
                            <Skeleton className="h-4 w-24 mb-4 bg-gray-200 dark:bg-zinc-800" />
                            {/* Title */}
                            <Skeleton className="h-12 md:h-14 w-3/4 mb-4 bg-gray-200 dark:bg-zinc-800" />
                            {/* Reviews */}
                            <div className="flex items-center space-x-4 mb-6">
                                <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-zinc-800" />
                            </div>
                            {/* Description */}
                            <Skeleton className="h-6 w-full mb-2 bg-gray-100 dark:bg-zinc-800/60" />
                            <Skeleton className="h-6 w-full mb-2 bg-gray-100 dark:bg-zinc-800/60" />
                            <Skeleton className="h-6 w-4/5 bg-gray-100 dark:bg-zinc-800/60" />
                        </div>

                        {/* Price */}
                        <div className="border-t border-b border-gray-100 dark:border-zinc-800 py-6">
                            <Skeleton className="h-10 w-40 bg-gray-200 dark:bg-zinc-800" />
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl">
                            <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-zinc-800" />
                            <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-zinc-800" />
                            <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-zinc-800" />
                            <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-zinc-800" />
                        </div>

                        {/* Button */}
                        <div className="flex gap-4 pt-4">
                            <Skeleton className="flex-1 h-14 rounded-full bg-brandBlue/50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Skeleton */}
            <div className="container mx-auto px-4 pt-16 mt-16 border-t border-gray-100 dark:border-zinc-800">
                <Skeleton className="h-8 md:h-10 w-64 mb-8 bg-gray-200 dark:bg-zinc-800" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 content-stretch items-stretch">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={`rel-sk-${index}`} className="h-full">
                            <ProductCardSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

