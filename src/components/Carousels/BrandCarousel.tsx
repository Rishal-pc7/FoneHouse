"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { ScrollAnimation } from "../../app/Template"
import Image from "next/image"
const brands=[
    {
        name: "Apple",
        logoUrl: "/apple.webp",
    },
    {
        name: "Samsung",
        logoUrl: "/samsung.webp",
    },
    {
        name: "Realme",
        logoUrl: "/realme.webp",
    },
    {
        name: "Honor",
        logoUrl: "/honor.webp",
    },
    {
        name: "Huawei",
        logoUrl: "/huawei.webp",
    },
    {
        name: "Infinix",
        logoUrl: "/infinix.webp",
    },
    {
        name: "Redmi",
        logoUrl: "/redmi.webp",
    },
]

function BrandCarousel() {
    const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false,stopOnMouseEnter:false,stopOnFocusIn:false,stopOnLastSnap:false })
  )
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full py-10 px-0 md:px-10"
      
      >
      <CarouselContent>
        {brands.map((item, index) => (
          <CarouselItem key={index} className="basis-1/2 md:basis-1/4">
            <ScrollAnimation initialOptions={{y:40}} animatedOptions={{y:0}} className="p-1">
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <Image src={item.logoUrl} alt={item.name} width={200} height={200} className="max-h-20 object-contain"  sizes="(max-width: 768px) 50vw, 25vw" loading="lazy"/>
                </CardContent>
            </ScrollAnimation>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default BrandCarousel
