import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
    return (
        <div className="block h-full outline-none">
            <div className="group relative h-full flex flex-col rounded-2xl bg-zinc-900/40 border border-zinc-800/50 overflow-hidden">
                {/* Category Badge Skeleton */}
                <div className="absolute top-4 left-4 z-20">
                    <Skeleton className="h-6 w-16 rounded-full bg-zinc-800" />
                </div>

                {/* Image Skeleton */}
                <div className="relative aspect-square sm:aspect-4/5 overflow-hidden flex items-center justify-center">
                    <Skeleton className="absolute inset-0 bg-zinc-800/50" />
                </div>

                {/* Content Skeleton */}
                <div className="p-4 pt-3 flex flex-col grow relative z-20 bg-linear-to-t from-zinc-900 via-zinc-900/95 to-transparent -mt-16">
                    {/* Title */}
                    <Skeleton className="h-6 w-3/4 mb-2 bg-zinc-800" />
                    {/* Description (2 lines) */}
                    <Skeleton className="h-3 w-full mb-1 bg-zinc-700/50 hidden sm:block" />
                    <Skeleton className="h-3 w-5/6 mb-3 bg-zinc-700/50 hidden sm:block" />

                    <div className="mt-auto pt-4 flex flex-col xl:flex-row xl:items-end justify-between gap-3">
                        {/* Price */}
                        <div className="flex flex-col gap-1 w-24">
                            <Skeleton className="h-2 w-10 bg-zinc-700" />
                            <Skeleton className="h-6 w-full bg-zinc-800" />
                        </div>

                        {/* Add to Cart Button */}
                        <Skeleton className="h-10 w-full xl:w-28 rounded-xl bg-zinc-800" />
                    </div>
                </div>
            </div>
        </div>
    );
}
