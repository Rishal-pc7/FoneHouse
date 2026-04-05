"use client";

import { Search, Filter } from "lucide-react";

const SELECT_CLASS = [
    "flex-1 min-w-[140px] md:flex-none h-14 px-4 pr-8 rounded-2xl",
    "bg-zinc-900 border border-zinc-800 focus:border-brandBlue focus:ring-1",
    "focus:ring-brandBlue outline-none text-zinc-300 font-medium appearance-none",
    "cursor-pointer transition-colors hover:border-zinc-700 text-sm",
].join(" ");

type Props = {
    searchQuery: string;
    selectedCategory: string;
    selectedBrand: string;
    categories: string[];
    brands: string[];
    onSearch: (v: string) => void;
    onCategory: (v: string) => void;
    onBrand: (v: string) => void;
    onClear: () => void;
};

export default function ShopFilters({
    searchQuery, selectedCategory, selectedBrand,
    categories, brands, onSearch, onCategory, onBrand, onClear,
}: Props) {
    return (
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
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full bg-transparent px-4 py-4 focus:outline-none text-zinc-200 placeholder:text-zinc-600 outline-none h-14"
                    />
                    <div className="pr-4 flex gap-1 items-center">
                        <kbd className="hidden sm:inline-flex items-center justify-center gap-1 rounded bg-zinc-800 px-2 text-xs font-medium text-zinc-400 h-6 border border-zinc-700 mr-1">⌘</kbd>
                        <kbd className="hidden sm:inline-flex items-center justify-center rounded bg-zinc-800 px-2 text-xs font-medium text-zinc-400 h-6 border border-zinc-700">K</kbd>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto flex-wrap md:flex-nowrap">
                <select value={selectedCategory} onChange={(e) => onCategory(e.target.value)} className={SELECT_CLASS}>
                    <option value="">All Categories</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <select value={selectedBrand} onChange={(e) => onBrand(e.target.value)} className={SELECT_CLASS}>
                    <option value="">All Brands</option>
                    {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>

                <button
                    onClick={onClear}
                    className="flex items-center justify-center gap-2 h-14 px-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 transition-all duration-300 group"
                    title="Clear Filters"
                >
                    <Filter size={18} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </button>
            </div>
        </div>
    );
}
