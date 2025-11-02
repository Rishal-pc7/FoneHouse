import {  Headphones,  Smartphone,  Store, Wrench } from 'lucide-react'
import React from 'react'
import { ScrollAnimation } from '../Template';

const cards = [
    {
        icon: Smartphone,
        iconProps: { strokeWidth: 2, size: 30 },
        heading: "Mobile Sales",
        description:"Get the latest smartphones from leading brands—expert guidance to match you with the perfect device."
    },
    {
        icon: Wrench,
        iconProps: { strokeWidth: 2, size: 30 },
        heading: "Professional Repairs",
        description:"Fast, trusted repairs for all mobile models. Our technicians restore your device’s performance and your peace of mind."
    },
    {
        icon: Headphones,
        iconProps: { strokeWidth: 2, size: 30 },
        heading: "Genuine Accessories",
        description:"Discover quality cases, chargers, earbuds, and more—find the right accessory for every need and style."
    },
    {
        icon: Store,
        iconProps: { strokeWidth: 2, size: 30},
        heading: "Retail & Wholesale Solutions",
        description:"Flexible service for individuals and businesses; enjoy special pricing and bulk orders, always with guaranteed authenticity."
    },
]
export function ServicesWeOffer() {
  return (
    <ScrollAnimation initialOptions={{y:40}} animatedOptions={{y:0}}>

       <div className='flex flex-col gap-3 p-8 md:p-20 w-full items-center justify-center'>
        <h1 className='text-brandBlue font-extrabold text-3xl'>Services we Offer</h1>
        <div className="cards grid grid-flow-col pt-16 w-full  grid-cols-1 md:grid-rows-none grid-rows-4 md:grid-cols-4 place-items-center gap-8">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollAnimation initialOptions={{y:-40}} animatedOptions={{y:0}} key={item.heading + index} className="rounded-sm p-4  flex flex-col gap-3 items-center border-2 border-brandBlue/10 shadow-lg relative">
                <div className="absolute top-0 -translate-y-1/2 bg-background px-1 left-1/2 -translate-x-1/2">
                <Icon {...item.iconProps} className='text-white/80' />
                </div> 
                <h2 className="text-brandBlue font-bold font-manrope text-xl mt-3">{item.heading}</h2>
                <p className="text-base md:text-lg  text-white/80 text-center">{item.description}</p>
              </ScrollAnimation>
            );
          })}
        </div>
    </div>
    </ScrollAnimation>
  )
}


export function AboutUs() {
    return (
        <ScrollAnimation initialOptions={{y:40}} animatedOptions={{y:0}}>
        <div className='flex flex-col gap-3 p-8 md:p-20  w-full items-center justify-center'>
            <h1 className='text-brandBlue font-extrabold text-3xl'>About Us</h1>
            <h4 className='text-white/80  font-semibold text-xl'>Fone House is dedicated to providing Saudi Arabia with leading mobile sales, expert repairs, and authentic accessories. Our store brings together the latest mobile brands and a team of skilled professionals, ensuring that every customer receives honest advice and top-quality service—whether you're shopping for yourself or your business.</h4>
            <h4 className='text-white/80  font-semibold text-xl'>With years of experience and a strong local presence, we make mobile solutions simple, affordable, and trustworthy. From individual upgrades to wholesale orders, Fone House delivers the reliability and care you deserve to stay connected in today’s fast-paced world.</h4>
        </div>
        </ScrollAnimation>
    )    
}

