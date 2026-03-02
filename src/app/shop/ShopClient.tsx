'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import { Product } from '@/lib/types';
import AddToCartButton from '@/components/AddToCartButton';

interface ShopClientProps {
    products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [specSearch, setSpecSearch] = useState<string>('');

    // Extract unique categories and brands for filters
    const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);
    const brands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;

        let matchesSpec = true;
        if (specSearch) {
            const specString = product.specifications ? JSON.stringify(product.specifications).toLowerCase() : '';
            matchesSpec = specString.includes(specSearch.toLowerCase());
        }

        return matchesSearch && matchesCategory && matchesBrand && matchesSpec;
    });
    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-[#050505] to-[#020202] pb-20 selection:bg-brandBlue/30 text-zinc-100 overflow-hidden font-manrope relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            {/* Immersive Hero Section with Atmospheric Glow */}
            <div className="relative border-b border-zinc-800/50 dark:border-zinc-900/50 pt-24 pb-16 overflow-hidden">
                {/* Background Glow Effects */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brandGreen/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-brandRed/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none mix-blend-screen" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="w-2 h-2 rounded-full bg-brandBlue animate-pulse" />
                        <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">Premium Selection</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-zinc-200 to-zinc-600 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Shop Our<br />Collection
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light tracking-wide animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                        Discover the latest mobile devices and genuine accessories.
                        Designed for performance, curated for you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Command Center Interaction */}
                <div className="flex flex-col md:flex-row gap-4 mb-16 items-center justify-between animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <div className="relative w-full md:max-w-xl group">
                        <div className="absolute inset-0 bg-linear-to-r from-brandBlue/20 to-brandGreen/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 focus-within:border-brandBlue/50 focus-within:ring-1 focus-within:ring-brandBlue/50">
                            <div className="pl-4 text-zinc-500">
                                <Search size={22} className="group-focus-within:text-brandBlue transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for command or product..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent px-4 py-4 focus:outline-none text-zinc-200 placeholder:text-zinc-600 outline-none h-14"
                            />
                            <div className="pr-4 flex gap-1 items-center">
                                <kbd className="hidden sm:inline-flex items-center justify-center gap-1 rounded bg-zinc-800 px-2 text-xs font-medium text-zinc-400 h-6 border border-zinc-700 mr-1">⌘</kbd>
                                <kbd className="hidden sm:inline-flex items-center justify-center rounded bg-zinc-800 px-2 text-xs font-medium text-zinc-400 h-6 border border-zinc-700">K</kbd>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto flex-wrap md:flex-nowrap">
                        <div className="flex-1 min-w-[140px] md:flex-none relative h-14 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden focus-within:border-brandBlue focus-within:ring-1 focus-within:ring-brandBlue transition-all">
                            <input
                                type="text"
                                placeholder="Specs (e.g. 256GB)"
                                value={specSearch}
                                onChange={(e) => setSpecSearch(e.target.value)}
                                className="w-full h-full bg-transparent px-4 text-zinc-300 placeholder:text-zinc-500 outline-none text-sm"
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="flex-1 min-w-[140px] md:flex-none h-14 px-4 pr-8 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none text-zinc-300 font-medium appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-size-[12px_12px] bg-position-[right_16px_center] bg-no-repeat cursor-pointer transition-colors hover:border-zinc-700 text-sm"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="flex-1 min-w-[140px] md:flex-none h-14 px-4 pr-8 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none text-zinc-300 font-medium appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-size-[12px_12px] bg-position-[right_16px_center] bg-no-repeat cursor-pointer transition-colors hover:border-zinc-700 text-sm"
                        >
                            <option value="">All Brands</option>
                            {brands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => {
                                setSelectedCategory('');
                                setSelectedBrand('');
                                setSearchQuery('');
                                setSpecSearch('');
                            }}
                            className="flex items-center justify-center gap-2 h-14 px-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 transition-all duration-300 group"
                            title="Clear Filters"
                        >
                            <Filter size={18} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Grid - Bento Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 relative z-10">
                    {filteredProducts.map((product, i) => {
                        const isOutOfStock = !product.isInStock || product.stock <= 0;
                        const delay = (i % 8) * 100; // Staggered entrance

                        return (
                            <Link href={`/shop/${product.id}`} key={product.id} className="block h-full outline-none">
                                <div
                                    className="group relative h-full flex flex-col rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 overflow-hidden hover:bg-zinc-900 transition-all duration-500 hover:-translate-y-1 animate-in fade-in zoom-in-95 fill-mode-both"
                                    style={{ animationDelay: `${delay}ms`, animationDuration: '800ms' }}
                                >
                                    {/* Hover Glow Behind Card */}
                                    <div className="absolute inset-0 bg-linear-to-br from-brandBlue/0 via-brandBlue/0 to-brandBlue/0 group-hover:from-brandBlue/10 group-hover:via-transparent group-hover:to-brandGreen/5 transition-all duration-700 pointer-events-none" />

                                    {/* Category Pill (Floating) */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-zinc-300">
                                            {product.category}
                                        </div>
                                    </div>

                                    {/* Out of Stock Pill */}
                                    {isOutOfStock && (
                                        <div className="absolute top-4 right-4 z-20">
                                            <div className="px-3 py-1.5 rounded-full bg-red-950/80 backdrop-blur-md border border-red-500/20 text-[10px] sm:text-xs font-bold text-red-500 flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,70,76,0.3)]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                SOLD OUT
                                            </div>
                                        </div>
                                    )}

                                    {/* Image Container */}
                                    <div className="relative aspect-square sm:aspect-4/5 overflow-hidden bg-zinc-950 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/95 via-transparent to-transparent z-10" />
                                        <Image
                                            src={product.img}
                                            alt={product.name}
                                            fill
                                            className={`object-cover group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] z-0 ${isOutOfStock ? 'grayscale opacity-40' : ''}`}
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                        />
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-4 pt-3 flex flex-col grow relative z-20 bg-linear-to-t from-zinc-900 via-zinc-900/95 to-transparent -mt-16">
                                        <h3 className="text-base sm:text-lg font-bold line-clamp-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                                            {product.name}
                                        </h3>

                                        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 font-light leading-relaxed hidden sm:-webkit-box">
                                            {product.description || "Premium performance meets sophisticated design in this flagship device."}
                                        </p>

                                        <div className="mt-auto pt-4 flex flex-col xl:flex-row xl:items-end justify-between gap-3">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest mb-0.5">Price</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xs font-semibold text-brandBlue">SAR</span>
                                                    <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                                                        {new Intl.NumberFormat('en-SA').format(product.price)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* We intercept the click here to prevent navigation if exactly clicking the button */}
                                            <div className="relative z-30 w-full xl:w-auto" onClick={(e) => e.stopPropagation()}>
                                                <AddToCartButton productId={product.id} isOutOfStock={isOutOfStock} price={product.price} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}
