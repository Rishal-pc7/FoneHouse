export default function ProductsLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <div className="h-7 bg-gray-200 dark:bg-zinc-800 rounded-lg w-32" />
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-64" />
                </div>
                <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl w-32" />
            </div>
            <div className="h-14 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full" />
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 dark:border-zinc-800 last:border-0">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-48" />
                            <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-24" />
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-20" />
                        <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded-full w-20" />
                    </div>
                ))}
            </div>
        </div>
    )
}
