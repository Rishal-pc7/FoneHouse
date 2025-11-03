import Link from 'next/link'
import React from 'react'
import { ScrollAnimation } from './Template'
import { XTwitter } from '../../public/customSvgs/Icons'
import { Instagram } from 'lucide-react'

function ContactSection() {
  return (
    <div className="grid  w-full  h-min md:h-screen gap-10 px-5 md:px-20 py-10 md:py-20 relative">
      <h2 className='text-5xl md:text-8xl text-center z-40 font-extrabold text-white/80'>Contact Us</h2>
      <ScrollAnimation initialOptions={{x:40}} animatedOptions={{x:0}} className=' h- flex flex-wrap gap-3 md:flex-nowrap  items-start justify-center -mt-15  z-10 backdrop-blur-3xl bg-white/15 border border-white/5 rounded-xl shadow-lg mx-5 md:mx-40 py-10 md:py-16 px-6 md:px-10' >
            <div className="basis-full md:basis-1/2 text-left flex flex-col gap-3">
              <h1 className="font-extrabold text-2xl md:text-3xl text-brandBlue">Get In Touch</h1>
              <h2 className="font-semibold text-lg md:text-xl text-white/80">Contact our team for quick support, questions, or service available every day by phone, WhatsApp, or email.</h2>
              <ul className='font-semibold text-lg md:text-xl text-white/80'>
                <li>Phone: +966 53 077 3448</li>
                <li>Whatsapp: +966 53 077 3448</li>
                <li>Email: fonehouseofficial.fh@gmail.com</li>
              </ul>
              <div className="">
              
              <Link href="https://www.instagram.com/fonehouse_officials_ksa?igsh=MmRnaW9xa3U5d29h" className="flex py-2 gap-6 md:gap-4 items-center h-10 justify-start  text-white/80">
              <h2 className="font-semibold text-lg md:text-xl text-white/80">Follow Us On:</h2>
                <Instagram className='hover:text-white/50'/>
              </Link>
            </div>

              <Link href={"/contact"} className="font-medium backdrop-blur-lg bg-white/5 border border-white/30 px-4 py-2 w-fit text-center">
                Contact Us
              </Link>
            </div>
            <div className='basis-full md:basis-1/2 h-80 md:h-96 relative'>
              <iframe
                  src="https://www.google.com/maps/embed?pb=[YOUR_MAP_EMBED_CODE]"
                  style={{ border: 0 }}
                  className="w-full h-full"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shop Location"
              />
            </div>
         </ScrollAnimation>
        </div>
  )
}

export default ContactSection
