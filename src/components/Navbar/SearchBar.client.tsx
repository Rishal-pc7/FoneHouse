"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const debounceTimer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.results || []);
                setIsOpen(true);
            } catch (error) {
                console.error("Failed to fetch search results", error);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const handleSelectOption = (id: number) => {
        setIsOpen(false);
        setQuery("");
        router.push(`/shop/${id}`);
    };

    return (
        <div ref={containerRef} className="relative w-full group z-50">
            <form onSubmit={handleSubmit}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim() && results.length > 0) setIsOpen(true);
                    }}
                    placeholder="Search products..."
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm transition-all outline-none focus:bg-white/10 focus:border-brandBlue/50 text-white placeholder:text-gray-400"
                />
            </form>

            {isOpen && (
                <div className="absolute mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden py-2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {isLoading ? (
                        <div className="px-4 py-3 text-sm text-gray-400">Searching...</div>
                    ) : results.length > 0 ? (
                        <ul className="divide-y divide-zinc-800/50">
                            {results.map((product) => (
                                <li key={product.id}>
                                    <button
                                        onClick={() => handleSelectOption(product.id)}
                                        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-zinc-800 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-md bg-zinc-800 overflow-hidden shrink-0">
                                            {product.img && (
                                                <Image src={product.img} alt={product.name} width={40} height={40} className="object-cover w-full h-full" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{product.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{product.category}</p>
                                        </div>
                                        <span className="text-sm font-bold text-brandBlue">${Number(product.price).toFixed(2)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-400">No products found</div>
                    )}
                </div>
            )}
        </div>
    );
}
