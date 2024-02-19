'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignedOut, useAuth} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
const LeftSideBar = () => {
  const {userId} = useAuth()
  console.log(userId);
  
  const pathname = usePathname() 
  return (
        <div className='background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex 
        h-screen flex-col justify-between overflow-y-auto 
        border-r p-6  pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[260px]'>
              <div className='flex flex-1 flex-col gap-6'>
                  {sidebarLinks.map(({imgURL,route,label})=>{
                    const isActive = (pathname.includes(route)) && route.length > 1 || pathname===route
                    if (route === '/profile') {
                      if (userId) {
                       route = `${route}/${userId}`
                      } else {
                        return null
                      }
                    }
                    return <div  key={route}>
                          <Link
                          href={route}
                          className={`
                            ${isActive 
                              ? 'primary-gradient rounded-lg text-light-900'
                              : 'text-dark300_light900'}
                            flex items-center justify-start gap-4 bg-transparent p-4  `}
                          >
                            <Image 
                            src={imgURL}
                            alt={label}
                            height={20}
                            width={20}
                            className={`${isActive ? '' : 'invert-colors'}`}
                            />
                            <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden  `}>{label}</p>
                          </Link>
                      </div>
                  })}
              </div>
              <SignedOut>
                <div className='flex flex-col gap-3 pt-9'>
                  <div >
                      <Link href='/sign-in'>
                        <Button className='small-medium btn-secondary min-h-[41px] 
                          w-full rounded-lg px-4 py-3  shadow-none'>
                           <Image
                            src='/assets/icons/account.svg'
                            alt='account'
                            width={20}
                            height={20}
                            className='invert-colors lg:hidden'
                            />  
                           <span className='primary-text-gradient max-lg:hidden'>Log In</span>
                        </Button>
                      </Link>
                  </div>
                  <div >
                      <Link href='/sign-up'>
                        <Button className='small-medium text-dark400_light900 light-border-2 btn-tertiary min-h-[41px] 
                          w-full rounded-lg px-4 py-3  shadow-none '>
                             <Image
                            src='/assets/icons/sign-up.svg'
                            alt='signup'
                            width={20}
                            height={20}
                            className='invert-colors lg:hidden'
                            />  
                            <p className='max-lg:hidden'>Sign Up</p>
                        </Button>
                      </Link>
                  </div>
                </div>
              </SignedOut>
        </div>
  )
}   

export default LeftSideBar