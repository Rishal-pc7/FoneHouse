"use client"
import { usePathname } from 'next/navigation';
import React,{useState,useEffect} from 'react'
import { Sheet } from '../ui/sheet';

function SideBar({children}:Readonly<{children:React.ReactNode}>) {
    const [isOpen,setIsOpen]=useState(false);
    const pathname=usePathname();
    useEffect(()=>{
        setIsOpen(false);
    },[pathname])
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {children}
    </Sheet>
  )
}

export default SideBar
