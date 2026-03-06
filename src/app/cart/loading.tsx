import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                {/* Header Skeleton */}
                <div className="mb-8 flex items-baseline">
                    <Skeleton className="h-10 w-48 bg-gray-200 dark:bg-zinc-800" />
                    <Skeleton className="h-6 w-24 ml-3 rounded-full bg-gray-200 dark:bg-zinc-800" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List Skeleton */}
                    <div className="grow space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={`cart-sk-${item}`} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/50 shadow-sm animate-pulse">
                                {/* Product Image */}
                                <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                    <Skeleton className="absolute inset-0 bg-transparent" />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 w-full space-y-3">
                                    <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-700" />
                                    <Skeleton className="h-4 w-1/2 bg-gray-100 dark:bg-zinc-800" />
                                </div>

                                {/* Controls */}
                                <div className="flex sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto gap-4 sm:gap-6 mt-4 sm:mt-0 px-2 sm:px-0">
                                    <Skeleton className="h-6 w-16 bg-brandBlue/20 rounded" />
                                    <Skeleton className="h-10 w-28 bg-gray-100 dark:bg-zinc-800 rounded-full" />
                                </div>
                                <div className="hidden sm:block">
                                    <Skeleton className="h-10 w-10 bg-gray-100 dark:bg-zinc-800 rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Skeleton */}
                    <div className="lg:w-96 shrink-0">
                        <div className="sticky top-24">
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-200/50 dark:shadow-none animate-pulse">
                                <Skeleton className="h-6 w-3/4 mb-6 bg-gray-200 dark:bg-zinc-800" />

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-zinc-800">
                                        <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-zinc-800" />
                                        <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-zinc-800" />
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-zinc-800">
                                        <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-zinc-800" />
                                        <Skeleton className="h-4 w-12 bg-green-500/20" />
                                    </div>
                                    <div className="flex justify-between items-end pt-2">
                                        <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-zinc-800" />
                                        <Skeleton className="h-8 w-24 bg-brandBlue/30" />
                                    </div>
                                </div>

                                <Skeleton className="w-full h-14 bg-brandBlue/50 rounded-2xl" />
                                <Skeleton className="w-full h-14 mt-3 bg-gray-100 dark:bg-zinc-800 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
