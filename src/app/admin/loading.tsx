export default function AdminLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="space-y-2">
                <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg w-40" />
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-64" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
                        <div className="flex justify-between">
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-24" />
                                <div className="h-7 bg-gray-200 dark:bg-zinc-800 rounded w-20" />
                            </div>
                            <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-32" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800" />
                <div className="h-64 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800" />
            </div>
        </div>
    )
}
