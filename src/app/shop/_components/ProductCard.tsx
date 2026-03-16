"use client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "../shop.types";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
    const isOutOfStock = !product.isInStock || product.stock <= 0;

    return (
        <Link href={`/shop/${product.id}`} className="block h-full outline-none group">
            <article className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70">

                {/* ── Image zone ── padded so image floats inside the card */}
                <div className="p-3 pb-0 shrink-0">
                    <div className="relative aspect-square sm:aspect-4/5 bg-zinc-800/50 overflow-hidden rounded-xl">
                        <Image
                            src={product.img}
                            alt={product.name}
                            fill
                            className={`object-cover md:group-hover:scale-[1.04] transition-transform duration-500 ease-out ${isOutOfStock ? "grayscale opacity-50" : ""}`}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />

                        {/* Brand badge – top left */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                            <span className="text-[9px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-zinc-300">
                                {product.brand}
                            </span>
                        </div>

                        {/* Category + sold-out – bottom of image */}
                        <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between">
                            <span className="text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-brandBlue/90 text-white shadow-sm">
                                {product.category}
                            </span>
                            {isOutOfStock && (
                                <span className="text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-red-600/90 text-white shadow-sm">
                                    Sold Out
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Info zone ── */}
                <div className="flex flex-col grow p-4 gap-3">
                    <h3 className="text-sm sm:text-[15px] font-bold leading-snug text-white line-clamp-2 group-hover:text-zinc-100 transition-colors duration-200 grow">
                        {product.name}
                    </h3>

                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <p className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-500 mb-0.5">Price</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xs font-bold text-brandBlue">SAR</span>
                                <span className="text-xl font-black tabular-nums tracking-tight text-white">
                                    {new Intl.NumberFormat("en-SA").format(product.price)}
                                </span>
                            </div>
                        </div>
                        {/* CTA – right side */}
                        <div onClick={(e) => e.stopPropagation()} className="shrink-0">
                            <AddToCartButton productId={product.id} isOutOfStock={isOutOfStock} price={product.price} className="px-5 min-w-[110px]" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
