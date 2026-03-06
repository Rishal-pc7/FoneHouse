import { getProducts } from "./shop.actions";
import ShopHero from "./_components/ShopHero";
import ProductGrid from "./_components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-[#050505] to-[#020202] pb-20 selection:bg-brandBlue/30 text-zinc-100 overflow-hidden font-manrope relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <ShopHero />
            <ProductGrid products={products} />
        </main>
    );
}
