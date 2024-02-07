import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
interface Props {
    title : string,
    description: string
}
const NoResults = ({title,description}:Props) => {
  return (
    <div className='m-10 flex w-full flex-col items-center'>
        <Image
         src='/assets/images/light-illustration.png'
         alt='no result'
         width={270}
         height={270}
         className='block object-contain dark:hidden '
        />
         <Image
         src='/assets/images/dark-illustration.png'
         alt='no result'
         width={270}
         height={270}
         className='hidden object-contain dark:flex  '
        />
        <h2 className='h2-bold text-dark200_light900 mt-8'>{title}</h2>
        <p className='body-regular text-dark500_light700 my-3.5 max-w-md text-center'>{description}</p>
        <Link href='/ask-questions' className="flex justify-end max-sm:w-full ">
            <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
              Ask a Question
            </Button>
        </Link>
    </div>
  )
}

export default NoResults