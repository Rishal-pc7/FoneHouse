import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { OurStory, OurVisionandMission, WhyChooseUS } from './Sections';
import ContactSection from '../ContactSection';
import {Template} from '../Template';

function page() {
  return (
    <>
    {/* <div className='relative grid md:grid-cols-2 md:grid-rows-none grid-rows-2 w-full h-auto md:h-[90vh]  bg-[#24B3DA]/45 pt-28 md:pt-16 pb-0'>
      <Template className="flex flex-col justify-center gap-5 basis-1/2 h-full px-8 md:px-16">
        <h1 className='font-extrabold text-[#1C4177] text-2xl'>Your Trusted Cleaning Partners in Saudi Arabia</h1>
        <h4 className='text-black/80 md:text-base font-semibold'>At Cleaning Llama, we believe a spotless space fuels a happier, healthier life. Proudly based in Saudi Arabia, our dedicated team of experienced professionals—each trained in top-quality standards—delivers reliable, detail-driven cleaning with a smile. Whether it’s your home, office, or commercial space, we’re here to make every corner shine, so you can focus on what matters most.</h4>
        <Link href='/contact' className="rounded-lg bg-[#1C4177] font-semibold w-fit p-4 text-center text-base text-white">Request Our Service Now</Link>
      </Template>
      <div className="flex justify-center min-h-[300px] relative">
        <Image src='/about.png' alt="About Us" className='relative object-cover z-10 w-full h-full' fill  loading='lazy' />
      </div>
    </div>
    <OurStory/>
    <OurVisionandMission/>
    <WhyChooseUS/>
    <ContactSection/> */}
    </>
  )
}

export default page
