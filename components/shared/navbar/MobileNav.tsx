import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
  
const MobileNav = () => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Image 
             src='/assets/icons/hamburger.svg'
             alt='Menu'
             height={36}
             width={36}
             className='invert-colors sm:hidden'
             />
        </SheetTrigger>
            <SheetContent side='left' className='background-light900_dark200 border-none'>
                <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
                </SheetHeader>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNav