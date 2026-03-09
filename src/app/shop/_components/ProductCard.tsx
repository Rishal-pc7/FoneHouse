"use client"
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "../shop.types";


type Props = { product: Product; animationDelay: number };

export default function ProductCard({ product, animationDelay }: Props) {
    const isOutOfStock = !product.isInStock || product.stock <= 0;

    return (
        <Link href={`/shop/${product.id}`} className="block h-full outline-none">
            <div
                className="group relative h-full flex flex-col rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 overflow-hidden hover:bg-zinc-900 transition-all duration-500 hover:-translate-y-1 animate-in fade-in zoom-in-95 fill-mode-both"
                style={{ animationDelay: `${animationDelay}ms`, animationDuration: "800ms" }}
            >
                <div className="absolute inset-0 bg-linear-to-br from-brandBlue/0 via-brandBlue/0 to-brandBlue/0 group-hover:from-brandBlue/10 group-hover:via-transparent group-hover:to-brandGreen/5 transition-all duration-700 pointer-events-none" />

                <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-zinc-300">
                        {product.category}
                    </div>
                </div>

                {isOutOfStock && (
                    <div className="absolute top-4 right-4 z-20">
                        <div className="px-3 py-1.5 rounded-full bg-red-950/80 backdrop-blur-md border border-red-500/20 text-[10px] sm:text-xs font-bold text-red-500 flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,70,76,0.3)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            SOLD OUT
                        </div>
                    </div>
                )}

                <div className="relative aspect-square sm:aspect-4/5 overflow-hidden bg-zinc-950 flex items-center justify-center">
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-900/95 via-transparent to-transparent z-10" />
                    <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className={`object-cover group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] z-0 ${isOutOfStock ? "grayscale opacity-40" : ""}`}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                </div>

                <div className="p-4 pt-3 flex flex-col grow relative z-20 bg-linear-to-t from-zinc-900 via-zinc-900/95 to-transparent -mt-16">
                    <h3 className="text-base sm:text-lg font-bold line-clamp-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 line-clamp-2 font-light leading-relaxed hidden sm:-webkit-box">
                        {product.description ?? "Premium performance meets sophisticated design."}
                    </p>
                    <div className="mt-auto pt-4 flex flex-col xl:flex-row xl:items-end justify-between gap-3">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest mb-0.5">Price</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xs font-semibold text-brandBlue">SAR</span>
                                <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                                    {new Intl.NumberFormat("en-SA").format(product.price)}
                                </span>
                            </div>
                        </div>
                        {/* Stop propagation so clicking the button doesn't navigate */}
                        <div className="relative z-30 w-full xl:w-auto" onClick={(e) => e.stopPropagation()}>
                            <AddToCartButton productId={product.id} isOutOfStock={isOutOfStock} price={product.price} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
