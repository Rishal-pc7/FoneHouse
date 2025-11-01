import {  Package, Settings, ShieldCheck, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react'
import { AnimatedCounter, ScrollAnimation } from './Template';
const cardsData = [
  {
    icon: Settings, // Expertise: use a wrench/screwdriver/tool icon
    iconProps: { strokeWidth: 2, size: 30, color: "#3277bc" },
    title: 12,
    suffix: "+",
    heading: "Years of Proven Experience",
    description:
      "Our technicians have served Saudi Arabia for 12 years, resolving every mobile issue with expert care.",
  },
  {
    icon: Package, // Orders completed: box/package icon
    iconProps: { strokeWidth: 2, size: 40, color: "#3277bc" },
    title: 100000,
    suffix: "+",
    heading: "Orders Successfully Completed",
    description:
           "More than 1,00,000 phones, repairs, and accessories delivered on time—trusted for our reliability always.",
  },
  {
    icon: ThumbsUp, // Good service
    iconProps: { strokeWidth: 2, size: 40, color: "#3277bc" },
    title: 5000,
    suffix: "+",
    heading: "Satisfied Customers Served",
    description:
      "Over 5000 customers trust us for friendly support, honest service, and personalized mobile solutions.",
  },
  {
    icon: ShieldCheck, // Shop value: peace of mind/security
    iconProps: { strokeWidth: 2, size: 40, color: "#3277bc" },
    title: 100,
    suffix: "%",
    heading: "Focused On Your Security",
    description:
      "Licensed shop, genuine products, and clear advice—your satisfaction and peace of mind come first.",
  },
];

function AboutSection() {
  const cards = useMemo(() => cardsData, []);

  return (
    <ScrollAnimation initialOptions={{y:-40}} animatedOptions={{y:0}} className="w-full text-center py-15 px-4 md:px-10 ">
        <div className="content grid gap-3 md:gap-5 place-items-center">
          <h4 className="font-semibold text-lg md:text-xl text-white/70">Who we are</h4>
          <h1 className="font-extrabold text-xl md:text-3xl text-brandBlue">Trusted Mobile Sales, Service & Accessories—Serving the Heart of Your Community</h1>
          <p className="md:w-[60%] text-base md:text-lg text-white/80">
            Fone House is one of Saudi Arabia’s top destinations for mobile sales, expert repairs, and genuine accessories. With a local team and years of experience, we deliver honest advice, fast service, and reliable support—keeping you connected every day.
          </p>
          <Link href={"/contact"} className="text-base md:text-lg text-white/80 underline">
            Why Choose Us?
          </Link>
        </div>
        <div className="cards grid grid-flow-col pt-16 w-full  grid-cols-1 md:grid-rows-none grid-rows-4 md:grid-cols-4 place-items-center gap-8">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollAnimation initialOptions={(index+1)%4==2 ? {y:-40}:{y:40}} animatedOptions={{y:0}} key={item.heading + index} className="rounded-sm p-4  flex flex-col gap-3 items-center border-2 border-[#1C4177]/10 shadow-lg relative">
                <div className="absolute top-0 -translate-y-1/2 bg-background px-1 left-1/2 -translate-x-1/2">
                <Icon {...item.iconProps} />
                </div> 
                <AnimatedCounter to={item.title} suffix={item.suffix} className="text-brandBlue font-extrabold text-3xl mt-3"></AnimatedCounter>
                <h2 className="text-brandBlue font-semibold text-xl">{item.heading}</h2>
                <p className="text-base md:text-lg  text-white/80">{item.description}</p>
              </ScrollAnimation>
            );
          })}
        </div>
      </ScrollAnimation>
  )
}

export default AboutSection
