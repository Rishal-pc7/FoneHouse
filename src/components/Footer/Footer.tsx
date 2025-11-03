import Link from "next/link"
import { Whatsapp, XTwitter } from "../../../public/customSvgs/Icons"
import { Instagram, Mail } from "lucide-react"
import Image from "next/image"
import Logo from '../../logo.webp'
import VAT from './tax.webp'
function Footer() {
  return (
    <div className="h-fit grid-rows-3 bg-black/40 text-white/70 w-full rounded-t-4xl shadow-inner shadow-black/50">
      <div className="flex flex-col md:flex-nowrap flex-wrap md:flex-row md:justify-between items-start md:h-64">
        <div className="contact-info flex flex-col items-center md:items-start w-full md:w-1/2 justify-center gap-6 p-8 md:p-16">
          <Image src={Logo} alt='Fone House' className='object-contain w-60'/>
          <h2 className="font-semibold text-xl mb-2 text-center md:text-start">Your trusted source for top-brand mobiles, expert repairs, and genuine accessories. Visit us for quality and service!</h2>
          <div className="flex gap-3">
          <Image src={VAT} alt='Fone House' className='object-contain w-10'/>
          <div className="font-semibold">
            <p>VAT Registration Number</p>
            <p>300736773400003</p>  
          </div>

          </div>
          <div className="flex gap-6 md:gap-4 justify-center ">
              <Link href="https://wa.me/+966530773448?text=Hello%2C%20I%20am%20interested%20in%20your%20Products " className="p-2 rounded-3xl border-2">
                <Whatsapp className="w-6 h-6"/>
              </Link>
              <Link href="mailto:fonehouseofficial.fh@gmail.com" className="p-2 rounded-3xl border-2 ">
                <Mail />
              </Link>
              <Link href="https://www.instagram.com/fonehouse_officials_ksa?igsh=MmRnaW9xa3U5d29h" className="p-2 rounded-3xl border-2">
                <Instagram />
              </Link>
            </div>
          </div>
        <div className="flex flex-col items-center text-center p-8 md:p-16 w-full md:w-1/2">
          <div className="flex flex-col gap-4  md:items-start  items-center font-semibold text-xl">
          <Link href="/" className="">Home</Link>
          <Link href="/about" className="">About Us</Link>
          <Link href="/contact" className="">Contact Us</Link>
          </div>
      </div>
      </div>  
      <div className="brand text-center mb-10">
        <h1 className="font-extrabold text-5xl md:text-9xl text-white/20">FoneHouse.</h1>
      </div>
      <footer className="flex flex-col items-center justify-center h-5 p-4">
        <div className="text-center">
          <p className="font-semibold text-base md:text-lg">© 2025 FoneHouse. All rights reserved.</p>
          </div>
        </footer>
    </div>
  )
}

export default Footer
