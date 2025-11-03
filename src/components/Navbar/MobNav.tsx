import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { Instagram,Mail,Menu } from 'lucide-react'
import Link from 'next/link'
import { Navlinks } from "./NavActions"
import { Whatsapp, XTwitter } from "../../../public/customSvgs/Icons"
import Image from "next/image"
import Logo from '../../logo.webp'
import SideBar from "./SideBar"

function MobNav() {
  return (
    <SideBar>
      <SheetTrigger asChild>
        <Button className="md:hidden ml-2 [&_svg:not([class*='size-'])]:size-6" variant="ghost"><Menu size={30} className="text-brandBlue" strokeWidth={3}/></Button>
      </SheetTrigger>
      <SheetContent className="backdrop-blur-lg bg-white/5 border items border-white/30 text-white">
        <SheetHeader>
              <SheetTitle className="p-4"><Image src={Logo} alt='Fone House' className='object-contain'/></SheetTitle>
        </SheetHeader>
        <Navlinks classes="md:hidden flex flex-col  p-6 gap-2 md:p-0 h-[75%]"/>
      <SheetFooter className="bottom-10 flex justify-center flex-row">
        <Link href='https://wa.me/+966530773448?text=Hello%2C%20I%20am%20interested%20in%20your%20Products' className="p-2 rounded-3xl border-2 border-white "><Whatsapp className="w-6 h-6"/></Link>
        <Link href='mailto:fonehouseofficial.fh@gmail.com' className="p-2 rounded-3xl border-2 border-white"><Mail /></Link>
        <Link href='https://www.instagram.com/fonehouse_officials_ksa?igsh=MmRnaW9xa3U5d29h' className="p-2 rounded-3xl border-2 border-white"><Instagram/></Link>
      </SheetFooter>
      </SheetContent>
    </SideBar>
  )
}

export default MobNav
