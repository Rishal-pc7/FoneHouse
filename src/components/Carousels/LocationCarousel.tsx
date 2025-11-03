"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Riyadh from "./riyadh.webp"
import Madina from "./madina.webp"
import Tuwaiq from "./tuwaiq.webp"
import CityFlower from "./cityFlower.webp"
import { ScrollAnimation } from "../../app/Template"
import Image from "next/image"
const brands=[
    {
        name: "Riyadh",
        logoUrl: Riyadh,
    },
    {
        name: "Madina",
        logoUrl: Madina,
    },
    {
        name: "Tuwaiq",
        logoUrl: Tuwaiq,
    },
    {
        name: "City Flower",
        logoUrl: CityFlower,
    },
    
]

function LocationCarousel() {
    const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false,stopOnMouseEnter:false,stopOnFocusIn:false,stopOnLastSnap:false })
  )
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full py-10 px-0 md:px-10"
      onPointerUp={plugin.current.reset}
      >
      <CarouselContent>
        {brands.map((item, index) => (
          <CarouselItem key={index} className="basis-[90%] md:basis-1/3">
            <ScrollAnimation initialOptions={{y:40}} animatedOptions={{y:0}} className="flex flex-col gap-4">

                  <Image src={item.logoUrl} alt={item.name}  className="aspect-square object-cover"  sizes="(max-width: 768px) 50vw, 25vw" loading="lazy"/>
                  <h2 className="font-semibold text-3xl text-white/90 text-center">{item.name}</h2>
            </ScrollAnimation>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default LocationCarousel
