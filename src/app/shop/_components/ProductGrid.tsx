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
    spec: string,
): Product[] {
    return products.filter((p) => {
        const q = search.toLowerCase();
        const matchesSearch =
            p.name.toLowerCase().includes(q) ||
            (p.description?.toLowerCase().includes(q) ?? false) ||
            p.category.toLowerCase().includes(q);
        const matchesCategory = category ? p.category === category : true;
        const matchesBrand = brand ? p.brand === brand : true;
        const specStr = spec
            ? (p.specifications ? JSON.stringify(p.specifications).toLowerCase() : "")
            : "";
        const matchesSpec = spec ? specStr.includes(spec.toLowerCase()) : true;
        return matchesSearch && matchesCategory && matchesBrand && matchesSpec;
    });
}

export default function ProductGrid({ products }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [specSearch, setSpecSearch] = useState("");

    const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
    const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

    const filtered = filterProducts(products, searchQuery, selectedCategory, selectedBrand, specSearch);

    const clearAll = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedBrand("");
        setSpecSearch("");
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <ShopFilters
                searchQuery={searchQuery}
                specSearch={specSearch}
                selectedCategory={selectedCategory}
                selectedBrand={selectedBrand}
                categories={categories}
                brands={brands}
                onSearch={setSearchQuery}
                onSpec={setSpecSearch}
                onCategory={setSelectedCategory}
                onBrand={setSelectedBrand}
                onClear={clearAll}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 relative z-10">
                {filtered.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        animationDelay={(i % 8) * 100}
                    />
                ))}
            </div>
        </div>
    );
}
