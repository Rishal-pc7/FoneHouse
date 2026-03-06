import ProductCardSkeleton from "./_components/ProductCardSkeleton";

export default function Loading() {
    // Generate an array of 8 items to map over for skeleton cards
    const skeletonCards = Array.from({ length: 8 }, (_, i) => i);

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
            {/* Background elements matched to shop page */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brandBlue/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brandGreen/10 blur-[100px] rounded-full pointer-events-none opacity-30" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-8">

                {/* Left Sidebar Filter Skeleton */}
                <div className="w-full lg:w-64 shrink-0">
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-2xl space-y-8 animate-pulse">
                        <div className="space-y-4">
                            <div className="h-6 w-24 bg-zinc-800 rounded-md" />
                            <div className="h-10 w-full bg-zinc-800 rounded-xl" />
                            <div className="h-10 w-full bg-zinc-800 rounded-xl" />
                        </div>
                        <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                            <div className="h-6 w-32 bg-zinc-800 rounded-md" />
                            <div className="h-8 w-full bg-zinc-800 rounded-md" />
                            <div className="h-8 w-full bg-zinc-800 rounded-md" />
                            <div className="h-8 w-full bg-zinc-800 rounded-md" />
                        </div>
                        <div className="w-full h-12 bg-zinc-800 rounded-xl mt-6" />
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="grow flex flex-col gap-6">
                    {/* Active Filters / Header Skeleton */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4 sm:p-6 shadow-2xl animate-pulse">
                        <div className="h-8 w-48 bg-zinc-800 rounded-md mb-4" />
                        <div className="flex gap-2">
                            <div className="h-8 w-24 bg-zinc-800 rounded-full" />
                            <div className="h-8 w-32 bg-zinc-800 rounded-full" />
                        </div>
                    </div>

                    {/* Product Grid Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 content-stretch items-stretch">
                        {skeletonCards.map((index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}

