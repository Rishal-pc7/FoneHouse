import {
  Sheet,
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

function MobNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden ml-2 [&_svg:not([class*='size-'])]:size-6" variant="ghost"><Menu size={30} className="text-brandBlue" strokeWidth={3}/></Button>
      </SheetTrigger>
      <SheetContent className="backdrop-blur-lg bg-white/5 border items border-white/30 text-white">
        <SheetHeader>
          <SheetTitle className="text-brandBlue">FoneHouse</SheetTitle>
        </SheetHeader>
        <Navlinks classes="md:hidden flex flex-col gap-6 p-4 gap-2 md:p-0 h-[75%]"/>
      <SheetFooter className="bottom-10 flex justify-center flex-row">
        <Link href='/' className="p-2 rounded-3xl border-2 border-white "><Whatsapp className="w-6 h-6"/></Link>
        <Link href='/' className="p-2 rounded-3xl border-2 border-white flex items-center"><XTwitter/></Link>
        <Link href='/' className="p-2 rounded-3xl border-2 border-white"><Mail /></Link>
        <Link href='/' className="p-2 rounded-3xl border-2 border-white"><Instagram/></Link>
      </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobNav
