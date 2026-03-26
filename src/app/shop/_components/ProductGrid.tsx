"use client";

import { useState } from "react";
import type { Product } from "../shop.types";
import ShopFilters from "./ShopFilters";
import ProductCard from "./ProductCard";

type Props = { products: Product[] };

function filterProducts(
    products: Product[],
    search: string,
    category: string,
    brand: string,
): Product[] {
    return products.filter((p) => {
        const q = search.toLowerCase();
        const matchesSearch =
            p.name.toLowerCase().includes(q) ||
            (p.description?.toLowerCase().includes(q) ?? false) ||
            p.category.toLowerCase().includes(q);
        const matchesCategory = category ? p.category === category : true;
        const matchesBrand = brand ? p.brand === brand : true;
        return matchesSearch && matchesCategory && matchesBrand;
    });
}

export default function ProductGrid({ products }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [visibleCount, setVisibleCount] = useState(12);

    const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
    const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

    const filtered = filterProducts(products, searchQuery, selectedCategory, selectedBrand);

    // reset pagination when filters change
    const onSearchChange = (val: string) => { setSearchQuery(val); setVisibleCount(12); };
    const onCategoryChange = (val: string) => { setSelectedCategory(val); setVisibleCount(12); };
    const onBrandChange = (val: string) => { setSelectedBrand(val); setVisibleCount(12); };

    const clearAll = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedBrand("");
        setVisibleCount(12);
    };

    const loadMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    const visibleProducts = filtered.slice(0, visibleCount);

    return (
        <div className="container mx-auto px-4 py-16">
            <ShopFilters
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedBrand={selectedBrand}
                categories={categories}
                brands={brands}
                onSearch={onSearchChange}
                onCategory={onCategoryChange}
                onBrand={onBrandChange}
                onClear={clearAll}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 relative z-10">
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            {visibleCount < filtered.length && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
