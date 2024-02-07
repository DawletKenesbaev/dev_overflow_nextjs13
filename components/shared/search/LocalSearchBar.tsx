'use client'
import { Input } from '@/components/ui/input'
import Image  from 'next/image'
import React from 'react'

interface Props  {
    placeholder:string,
    route:string,
    imgSrc:string,
    iconPosition:string,
    otherClasses:string
}


const LocalSearchBar = ({placeholder,route,imgSrc,iconPosition,otherClasses}:Props) => {
  return (
    // <div className=' mt-11 flex justify-between w-full gap-5 max-sm:flex-col sm:items-center'>    
        <div className={`background-light800_darkgradient  relative flex min-h-[56px]  grow items-center gap-4   rounded-xl px-4 ${otherClasses}`}>
            {iconPosition ==='left' &&
                <Image
                src={imgSrc}
                alt='search'    
                width={24}
                height={24}
                className='cursor-pointer '
                />
             }
            <Input 
            type='text'
            placeholder={`${placeholder}`}
            className='paragraph-regular no-focus
              background-light800_darkgradient
              placeholder
              border-none shadow-none outline-none 
              ' 
          />
           {iconPosition ==='right' &&
                <Image
                src={imgSrc}
                alt='search'    
                width={24}
                height={24}
                className='cursor-pointer '
                />
             }
        </div>
  )
}

export default LocalSearchBar