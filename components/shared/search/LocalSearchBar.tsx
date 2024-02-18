'use client'
import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import Image  from 'next/image'
import { usePathname, useSearchParams ,useRouter} from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props  {
    placeholder:string,
    route:string,
    imgSrc:string,
    iconPosition:string,
    otherClasses:string
}


const LocalSearchBar = ({placeholder,route,imgSrc,iconPosition,otherClasses}:Props) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')
 const [search, setSearch] = useState(query || '')  

 useEffect(()=>{
  const  delayDebounceFn = setTimeout(() => {
     if (search) {
       const newUrl = formUrlQuery({
        params:searchParams.toString(),
        key:'q',
        value: search
       }) 
       router.push(newUrl,{scroll:false})
     } 
     else {
      if (pathname === route) {
       const newUrl  = removeKeysFromQuery({
         params:searchParams.toString(),
         keysToRemove:['q']

       })
       router.push(newUrl,{scroll:false})
      }
    }
  }, 400);
  return ()=> clearTimeout(delayDebounceFn)

 },[search,route ,pathname,searchParams,router,query])
  
  return (
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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