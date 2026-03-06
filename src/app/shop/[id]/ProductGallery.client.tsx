'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
    productName: string;
    isOutOfStock: boolean;
}

export default function ProductGallery({ images, productName, isOutOfStock }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // If no images are provided, return null or a placeholder
    if (!images || images.length === 0) return null;

    return (
        <div className="flex flex-col lg:flex-row-reverse gap-4 lg:h-full lg:max-h-[600px]">
            {/* Main Image Container */}
            <div className="relative aspect-square w-full lg:w-4/5 lg:h-full bg-gray-100 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm transition-all duration-300 shrink-0">
                {images.map((img, index) => (
                    <Image
                        key={`main-img-${index}`}
                        src={img}
                        alt={`${productName} - Image ${index + 1}`}
                        fill
                        className={`object-cover hover:scale-105 transition-all duration-300 ease-in-out
                            ${isOutOfStock ? 'grayscale opacity-80' : ''}
                            ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                        `}
                        priority={index === 0} // Always prioritize the first one, Next.js will lazily load others but they'll remain in DOM
                        sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                ))}

                {isOutOfStock && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-20">
                        Out of Stock
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden w-full lg:w-1/5 pb-2 lg:pb-0 snap-x lg:snap-y hide-scrollbar">
                    {images.map((img, index) => (
                        <button
                            key={`thumb-${index}`}
                            onClick={() => setActiveIndex(index)}
                            className={`relative w-20 h-20 md:w-24 md:h-24 lg:w-full lg:h-24 lg:shrink-0 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 snap-start
                                ${activeIndex === index
                                    ? 'border-brandBlue shadow-md scale-105 lg:scale-95'
                                    : 'border-transparent opacity-70 hover:opacity-100 bg-gray-100 dark:bg-zinc-800'
                                }
                            `}
                        >
                            <Image
                                src={img}
                                alt={`${productName} thumbnail ${index + 1}`}
                                fill
                                className={`object-cover ${isOutOfStock ? 'grayscale opacity-80' : ''}`}
                                sizes="(max-width: 1024px) 96px, 20vw"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
