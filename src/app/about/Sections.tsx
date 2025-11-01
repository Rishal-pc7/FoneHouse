import { Handshake, ShieldCheck, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import heroImg from "./vision.png";
import { ScrollAnimation } from '../Template';

const cards = [
    {
        icon: Users,
        iconProps: { strokeWidth: 2, size: 30, color: "#24B3DA" },
        heading: "Expert Team",
        description:"Our Workers are Skilled, background-checked Indian professionals dedicated to quality and trust."
    },
    {
        icon: Handshake,
        iconProps: { strokeWidth: 2, size: 30, color: "#24B3DA" },
        heading: "Reliable & Respectful",
        description:"We’re punctual, friendly, professional, and always deliver a respectful, positive experience every visit."
    },
    {
        icon: Sparkles,
        iconProps: { strokeWidth: 2, size: 30, color: "#24B3DA" },
        heading: "Spotless Track Record",
        description:"High satisfaction, trusted reputation, and happy clients—we leave every space sparkling and inviting."
    },
    {
        icon: ShieldCheck,
        iconProps: { strokeWidth: 2, size: 30, color: "#24B3DA" },
        heading: "Modern Tools & Safe Methods",
        description:"We use advanced equipment, safe products, and careful methods to ensure perfect, healthy results"
    },
]
export function WhyChooseUS() {
  return (
    <ScrollAnimation initialOptions={{y:40}} animatedOptions={{y:0}}>

       <div className='flex flex-col gap-3 p-8 md:p-20 w-full items-center justify-center'>
        <h1 className='text-[#24B3DA] font-extrabold text-3xl'>Why Choose Us?</h1>
        <div className="cards grid grid-flow-col pt-16 w-full  grid-cols-1 md:grid-rows-none grid-rows-4 md:grid-cols-4 place-items-center gap-8">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollAnimation initialOptions={{y:-40}} animatedOptions={{y:0}} key={item.heading + index} className="rounded-sm p-4  flex flex-col gap-3 items-center border-2 border-[#1C4177]/10 shadow-lg relative">
                <div className="absolute top-0 -translate-y-1/2 bg-slate-100 px-1 left-1/2 -translate-x-1/2">
                <Icon {...item.iconProps} />
                </div> 
                <h1 className="text-[#24B3DA] font-bold text-xl mt-3">{item.heading}</h1>
                <p className="text-base md:text-lg  text-[#1C4177] text-center">{item.description}</p>
              </ScrollAnimation>
            );
          })}
        </div>
    </div>
    </ScrollAnimation>
  )
}

export function OurStory() {
    return (
        <ScrollAnimation initialOptions={{y:40}} animatedOptions={{y:0}}>
        <div className='flex flex-col gap-3 p-8 md:p-20  w-full items-center justify-center'>
            <h1 className='text-[#24B3DA] font-extrabold text-3xl'>Our Story</h1>
            <h4 className='text-[#1C4177] text-center font-semibold text-lg'>Cleaning Llama began with a simple mission: to raise the standard of cleanliness and customer care in Saudi Arabia. Founded by a team who understands the value of a fresh, welcoming space, we’ve grown from a small operation to a trusted local brand. Over the years, our reputation has been built on integrity, dedication, and consistently delivering exceptional results</h4>
        </div>
        </ScrollAnimation>
    )    
}
export function OurVisionandMission(){
    return (
        <div className="relative grid auto-rows-min grid-rows-[.5fr_1fr] md:grid-rows-none md:grid-cols-2 p-8 md:p-20 gap-5 md:gap-10">
        <ScrollAnimation initialOptions={{x:-40}} animatedOptions={{x:0}} className='md:h-[50vh] w-full flex flex-col gap-3 order-2 md:order-1'>
            <h1 className='text-[#24B3DA] font-extrabold text-3xl'>Our Vision</h1>
            <h4 className='text-[#1C4177] font-semibold text-lg'>To be Saudi Arabia’s most trusted cleaning service, renowned for professionalism, integrity, and innovative solutions. We aim to elevate the standard of cleanliness while building lasting relationships with both clients and our dedicated team.</h4>
            <h1 className='text-[#24B3DA] font-extrabold text-3xl'>Our Mission</h1>
            <h4 className='text-[#1C4177] font-semibold text-lg'>To deliver exceptional cleaning services that create healthier, happier environments for our clients. We are committed to reliability, transparency, and utmost care in every corner we clean—always striving for excellence and a personal touch.</h4>
        </ScrollAnimation>
        <ScrollAnimation initialOptions={{x:40}} animatedOptions={{x:0}} className='md:h-[50vh] w-full relative order-1 md:order-2'>
            <Image src={heroImg} alt='Our Vision'  loading='lazy' className='h-full relative object-cover object-center' sizes="(max-width: 768px) 100vw, 50vw"/>
        </ScrollAnimation>
        </div>
    )
}
