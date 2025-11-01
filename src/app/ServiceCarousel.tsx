import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { ScrollAnimation } from "./Template"
type ServiceList={
  image:string,
  heading:string,
  description:string
}
export function ServiceCarousel({display,services}:Readonly<{display:string,services:ServiceList[]}>) {
  return (
    <Carousel className={`w-full max-w-[90vw] pb-10 ${display}`}>
      <CarouselContent className="">
        {services.map((item, index) => (
          <CarouselItem key={index} className="basis-[90%]">
            <ScrollAnimation initialOptions={{y:40}} animatedOptions={{y:0}}>

            <Card className="rounded-md bg-white border-[3px] border-white p-0 items-stretch">
              <CardContent className="p-0">
                <Image src={item.image} alt="" className="rounded-t-md w-full" width={500} height={50}/>
                          <div className="content p-4 grid gap-3">
                            <h1 className="font-extrabold text-lg text-[#24B3DA]">{item.heading}</h1>
                            <h2 className="font-semibold text-lg  text-[#1C4177]">{item.description}</h2>
                          </div> 
              </CardContent>
            </Card>
            </ScrollAnimation>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
