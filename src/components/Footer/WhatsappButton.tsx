import React from 'react'
import { Whatsapp } from '../../../public/customSvgs/Icons'
import Link from 'next/link'
import { SendHorizonal } from 'lucide-react'

function WhatsappButton() {
  return (
    <div className='group grid p-2 gap-2 z-20 fixed bottom-8 left-0 md:left-auto  -translate-x-5 md:translate-x-0 md:right-2'>
        <Link 
          href='' 
          className='relative text-lg font-semibold   flex items-center group/wtsp'
        >
          <Whatsapp className='h-13 w-13 bg-white py-2.5 z-10 rounded-full  size-7 text-[#1C4177]'/>
          <span className='group-focus/wtsp:inline-block text-center w-48 py-1.5 px-3 -ml-3 z-1 bg-white rounded-r-full shadow-lg hidden md:inline-block font-semibold text-lg text-[#1C4177]'>
            Whatsapp Booking
          </span>
        </Link>
        <Link 
          href='/contact' 
          className='relative text-lg font-semibold   flex items-center group/request'
        >
          <SendHorizonal className='h-13 w-13 bg-white py-2.5 z-10 rounded-full  size-7 text-[#1C4177]'/>
          <span className='group-focus/request:inline-block text-center w-48 py-1.5 px-3 -ml-3 z-1 bg-white rounded-r-full shadow-lg hidden md:inline-block font-semibold text-lg text-[#1C4177]'>
            Request Service
          </span>
        </Link>
        
    </div>
  )
}

export default WhatsappButton
