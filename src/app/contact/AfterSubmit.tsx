"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  error?:string|null;
}

export function Success({isOpen, setIsOpen,error}:Props) {
  return (
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
        {error ? <DialogTitle>{error}</DialogTitle> :
        <>
      <DialogTitle>Enquiry Submitted Succesfully</DialogTitle>
      <DialogDescription>
        Our Team will get back to you shortly.
      </DialogDescription>
        </>
    }
    </DialogHeader>
    <DialogFooter>
        <DialogClose asChild>
            {error ? <Button variant='outline'>Try Again</Button>:<Link href={"/"} ><Button variant='outline'>Go to Home</Button></Link>}
        </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

