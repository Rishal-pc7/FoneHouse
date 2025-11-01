import Link from "next/link"
import { Whatsapp, XTwitter } from "../../../public/customSvgs/Icons"
import { Instagram, Mail } from "lucide-react"

function Footer() {
  return (
    <div className="h-fit grid-rows-3 bg-black/40 w-full rounded-t-4xl shadow-inner shadow-black/50">
      <div className="flex flex-col md:flex-nowrap flex-wrap md:flex-row md:justify-between items-start md:h-64">
        <div className="contact-info flex flex-col items-center md:items-start w-full md:w-1/2 justify-center gap-6 p-8 md:p-16">
          <h2 className="font-semibold text-xl text-[#1C4177] mb-2 text-center md:text-start">Your trusted source for top-brand mobiles, expert repairs, and genuine accessories. Visit us for quality and service!</h2>
          <div className="flex gap-6 md:gap-4 justify-center  text-[#1C4177]">
              <Link href="/" className="p-2 rounded-3xl border-2 border-[#1C4177] ">
                <Whatsapp className="w-6 h-6"/>
              </Link>
              <Link href="/" className="p-2 rounded-3xl border-2 border-[#1C4177] flex items-center">
                <XTwitter />
              </Link>
              <Link href="/" className="p-2 rounded-3xl border-2 border-[#1C4177]">
                <Mail />
              </Link>
              <Link href="/" className="p-2 rounded-3xl border-2 border-[#1C4177]">
                <Instagram />
              </Link>
            </div>
          </div>
        <div className="flex flex-col items-center text-center p-8 md:p-16 w-full md:w-1/2">
          <div className="flex flex-col gap-4 text-[#1C4177] md:items-start  items-center font-semibold text-xl">
          <Link href="/" className="">Home</Link>
          <Link href="/about" className="">About Us</Link>
          <Link href="/contact" className="">Contact Us</Link>
          </div>
      </div>
      </div>  
      <div className="brand text-center mb-10">
        <h1 className="font-extrabold text-5xl md:text-9xl text-[#1C4177]/20">FoneHouse.</h1>
      </div>
      <footer className="text-[#1C4177] flex flex-col items-center justify-center h-5 p-4">
        <div className="text-center">
          <p className="font-semibold text-base md:text-lg">© 2025 FoneHouse. All rights reserved.</p>
          </div>
        </footer>
    </div>
  )
}

export default Footer
