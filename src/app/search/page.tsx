import { searchProducts } from "./search.actions";
import ProductGrid from "../shop/_components/ProductGrid";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q || "";

    // We fetch the products based on the query parameter
    const products = await searchProducts(query);

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-[#050505] to-[#020202] pt-32 pb-20 selection:bg-brandBlue/30 text-zinc-100 overflow-hidden font-manrope relative border-t border-white/5">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 mb-12">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold font-urbanist mb-4">
                        Search Results
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        {query
                            ? `Showing results for "${query}"`
                            : "Enter a search term to find products."}
                        <span className="ml-2 text-brandBlue font-medium">({products.length} found)</span>
                    </p>
                </div>
            </div>

            <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-brandBlue" />
                </div>
            }>
                {products.length > 0 ? (
                    <ProductGrid products={products} />
                ) : (
                    <div className="container mx-auto px-4 py-20 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-800/50 mb-6">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white">No products found</h2>
                        <p className="text-zinc-400 max-w-md mx-auto">
                            We couldn't find anything matching "{query}". Try adjusting your search term or browsing our categories.
                        </p>
                    </div>
                )}
            </Suspense>
        </main>
    );
}
