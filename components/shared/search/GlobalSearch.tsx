'use client'
import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import Image  from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import GlobalResult from './GlobalResult'

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchRef = useRef(null)

  const query = searchParams.get('global')
  const [search, setSearch] = useState(query || '')
  const [isOpen, setIsOpen] = useState(false)  
  useEffect(() => {
    const  handleOutSideClick =()=>{
      if (searchRef.current &&
        // @ts-ignore
         !searchRef.current.contains(event.target)  ) {
        setIsOpen(false)
        setSearch('')
      }
    }
    setIsOpen(false)
    document.addEventListener('click',handleOutSideClick)
    return ()=>{
      document.removeEventListener('click',handleOutSideClick)
    }
  }, [pathname])
    
 useEffect(()=>{
  const  delayDebounceFn = setTimeout(() => {
     if (search) {
       const newUrl = formUrlQuery({
        params:searchParams.toString(),
        key:'global',
        value: search
       }) 
       router.push(newUrl,{scroll:false})
     } 
     else {       
      if (query) {
       const newUrl  = removeKeysFromQuery({
         params:searchParams.toString(),
         keysToRemove:['global','type']

       })
       router.push(newUrl,{scroll:false})
      }
    }
  }, 400);
  return ()=> clearTimeout(delayDebounceFn)

 },[search ,pathname,searchParams,router,query])
  
  return (
    <div className='relative w-full max-w-[600px] max-lg:hidden ' ref={searchRef}>    
        <div className='background-light800_darkgradient  relative flex min-h-[56px]  grow items-center gap-1  rounded-xl px-4   '>
            <Image
            src='/assets/icons/search.svg'
            alt='search'
            width={24}
            height={24}
            className='cursor-pointer'
            />
            <Input 
            value={search}
            onChange={(e)=>{
              setSearch(e.target.value)
              if (!isOpen) setIsOpen(true)
              if(e.target.value ==='' && isOpen) setIsOpen(false )
            }}
            type='text'
            placeholder='Search anything'
            className='paragraph-regular no-focus
              background-light800_darkgradient
              text-dark400_light700
              placeholder
              border-none shadow-none outline-none 
              ' 
          />
        </div>
        {
          isOpen && <GlobalResult />
        }
    </div>
  )
}

export default GlobalSearch