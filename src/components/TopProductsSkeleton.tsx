import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function TopProductsSkeleton() {
    return (
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-zinc-950">
            <div className="w-full px-4 md:px-10 max-w-[1440px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-10 gap-4">
                    <div className="text-center md:text-left">
                        <Skeleton className="h-8 md:h-10 w-64 mb-4 bg-gray-200 dark:bg-zinc-800 mx-auto md:mx-0" />
                        <Skeleton className="h-4 md:h-5 w-80 bg-gray-200 dark:bg-zinc-800 mx-auto md:mx-0" />
                    </div>
                    <Link href="/shop" className="hidden md:inline-flex items-center text-brandBlue/50 hover:text-blue-700 font-medium transition-all pointer-events-none">
                        View All Products <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 animate-pulse">
                    {[1, 2, 3, 4].map((index) => (
                        <Card key={`top-sk-${index}`} className="overflow-hidden border-gray-200 dark:border-zinc-800 flex flex-col h-full bg-white dark:bg-zinc-900 py-0 gap-0">
                            {/* Image Skeleton */}
                            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800 block">
                                <Skeleton className="absolute inset-0 bg-transparent" />
                            </div>

                            <CardHeader className="p-3 md:p-5 pb-0 md:pb-2">
                                <Skeleton className="h-3 w-16 mb-2 bg-gray-200 dark:bg-zinc-700" />
                                <Skeleton className="h-5 md:h-6 w-full bg-gray-200 dark:bg-zinc-800" />
                            </CardHeader>

                            <CardContent className="p-3 md:p-5 pt-0 md:pt-0 grow">
                                <Skeleton className="h-3 w-full mb-1 bg-gray-100 dark:bg-zinc-800/60" />
                                <Skeleton className="h-3 w-4/5 bg-gray-100 dark:bg-zinc-800/60" />
                            </CardContent>

                            <CardFooter className="p-3 md:p-5 pt-0 md:pt-0 flex items-center justify-between mt-auto">
                                <Skeleton className="h-6 md:h-8 w-20 bg-gray-200 dark:bg-zinc-700" />
                                <Skeleton className="h-10 w-28 bg-brandBlue/30 rounded-xl" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/shop" className="inline-flex items-center text-brandBlue/50 font-medium pointer-events-none">
                        View All Products <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
