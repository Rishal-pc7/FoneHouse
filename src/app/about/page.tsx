import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { OurStory, OurVisionandMission, WhyChooseUS } from './Sections';
import ContactSection from '../ContactSection';
import {Template} from '../Template';
import heroImg from './hero.jpg'
function page() {
  return (
    <>
    <div className="relative h-[90vh] w-full flex pb-20 md:pb-0 items-end-safe md:items-center text-white">      
            <Image src={heroImg} placeholder="blur"  alt="Clean modern interior" className="absolute inset-0 object-cover  object-[63%] w-full h-full z-0"  fill  priority unoptimized  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"/>
            <div className="absolute inset-0 bg-black/70  z-10"></div>
            <Template className="content md:p-5 p-3 z-10 flex flex-col gap-3 md:gap-5">
              <h1 className="font-extrabold text-xl md:text-3xl">Your One-Stop Shop for All Things Mobile</h1>
              <h5 className="font-light text-base md:text-xl">Experience the Best in Mobile Sales, Fast Repairs, and Genuine Accessories for Every Need</h5>
              <Link href={"/contact"} className="font-medium backdrop-blur-lg bg-white/5 border border-white/30 px-4 py-2 w-fit text-center">
                Learn More
              </Link>
            </Template>
          </div>
    {/* <OurStory/>
    <OurVisionandMission/>
    <WhyChooseUS/>
    <ContactSection/> */}
    </>
  )
}

export default page
