"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { ScrollAnimation } from "./Template"
import Image from "next/image"
const brands=[
    {
        name: "Apple",
        logoUrl: "/apple.png",
    },
    {
        name: "Samsung",
        logoUrl: "/samsung.png",
    },
    {
        name: "Realme",
        logoUrl: "/realme.jpg",
    },
    {
        name: "Honor",
        logoUrl: "/honor.png",
    },
    {
        name: "Huawei",
        logoUrl: "/huawei.png",
    },
    {
        name: "Infinix",
        logoUrl: "/infinix.png",
    },
    {
        name: "Redmi",
        logoUrl: "/redmi.png",
    },
]
function BrandsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="w-full py-10 px-4 md:px-10 " >
    <ScrollAnimation initialOptions={{y:-40}} animatedOptions={{y:0}} className="w-full flex flex-col gap-4 items-center text-center ">
        <h2 className="font-extrabold text-2xl md:text-4xl text-white/80">Brands We Offer</h2>
          <h4 className="font-semibold text-base md:text-xl text-brandBlue">
            We offer a wide range of leading mobile brands and accessories, ensuring quality products suited to every need.
          </h4>
    </ScrollAnimation>
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
    
    </div>
  )
}
export default BrandsSection