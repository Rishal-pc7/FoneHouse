import Image from 'next/image'
import React from 'react'
import { Navlinks } from './NavActions'
import MobNav from './MobNav'
import Logo from '../logo.png'

function Navbar() {
  return (
    <div className='font-manrope z-20 text-white absolute top-4 flex justify-between'>
      <div className="hidden md:flex logo h-full  w-1/2 md:w-[35%] justify-center md:justify-start items-center   p-3">
        <Image src={Logo} alt='Fone House' className='object-contain'/>
      </div>
    <div className="fixed right-1/2 translate-x-1/2 min-w-[70%] md:min-w-[25%] h-10 md:h-10 md:px-10  backdrop-blur-lg bg-white/5 border border-white/30 rounded-xl shadow-lg  flex justify-between md:justify-center">
      <div className="flex md:hidden logo h-full  w-1/2 md:w-[35%] justify-center md:justify-start items-center   p-3">
        <Image src={Logo} alt='Fone House' className='object-contain'/>
      </div>
      
      <MobNav/>
      <Navlinks classes='md:flex hidden justify-center'/>
    </div>
    </div>
  )
}

export default Navbar
