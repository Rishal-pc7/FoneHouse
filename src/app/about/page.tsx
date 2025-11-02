import React from 'react'
import Image from 'next/image';
import { AboutUs, ServicesWeOffer } from './Sections';
import ContactSection from '../ContactSection';
import {Template} from '../Template';
import heroImg from './hero.jpg'
import BrandsSection from '../BrandsSection';
import LocationSection from '../LocationSection';
function page() {
  return (
    <>
      <div className="relative px-4 md:px-10 h-[90vh] w-full flex pb-20 md:pb-0 items-end-safe md:items-center text-white">      
            <Image src={heroImg} placeholder="blur"  alt="Clean modern interior" className="absolute inset-0 object-cover  object-[63%] w-full h-full z-0"  fill  priority unoptimized  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"/>
            <div className="absolute inset-0 bg-black/70  z-10"></div>
            <Template className="content text-white/90 md:py-5 py-3 z-10 flex flex-col gap-3 md:gap-5">
              <h1 className="font-extrabold text-xl md:text-3xl">Empowering Saudi Arabia with Trusted Mobile Solutions</h1>
              <h5 className="font-light  md:w-3/4 text-base md:text-xl">Discover Fone House—one of Saudi Arabia&apos;s 
              leading mobile shops for top brands, 
              expert repairs, and genuine accessories. 
              Our dedicated team delivers honest advice, 
              fast service, and quality products for every
               customer—retail and wholesale. Stay connected with confidence!</h5>
            </Template>
      </div>
      <AboutUs/>
      <ServicesWeOffer/>
      <BrandsSection/>
      <LocationSection/>
      <ContactSection/>
    </>
  )
}

export default page
