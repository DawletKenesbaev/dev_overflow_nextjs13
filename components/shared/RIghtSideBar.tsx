import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTags from './RenderTags'

const questions = [
    {id:0,title:'best practise for fetching data Nextjs applicatidering ssr'},
    {id:1,title:'best practise for fetching data Nextjs application rendering ssr'},
    {id:2,title:'best practise for fetching data Nextjs applndering ssr'},
    {id:3,title:'best practise for fetching data Nextjs applendering ssr'},
    {id:4,title:'best data Nextjs application rendering ssr'}
]
const popularTags =[
  {id:1,title:'Javascript',totalQuestions:12},
  {id:2,title:'Reactjs',totalQuestions:9},
  {id:3,title:'Redux',totalQuestions:2},
  {id:4,title:'Nextjs',totalQuestions:4}


]
const RIghtSideBar = () => {
  return (
    <div className='background-light900_dark200 
     light-border custom-scrollbar sticky right-0 top-0 flex 
    h-screen w-[350px]  flex-col overflow-y-auto 
    border-l p-6  pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
        <div>
            <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
            <div className='mt-7 flex w-full flex-col gap-[30px]'>
               {questions.map((item)=>(
                <Link 
                href={`/questions/${item.id}`}
                key={item.id}
                className='flex cursor-pointer items-center
                justify-between gap-7' 
                >
                   <p className='body-medium text-dark500_light700'>{item.title}</p>
                   <Image 
                   src='/assets/icons/chevron-right.svg'
                   width={20}
                   height={20}
                   alt='arrow'
                   className='invert-colors'
                   />
                </Link>
               ))}
               
            </div>
        </div>
        <div className='mt-16'>
            <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
            <div className='mt-7 flex flex-col gap-4'>
              {
                popularTags.map((tag)=>(
                   <RenderTags key={tag.id} id={tag.id} title={tag.title} totalQuestions={tag.totalQuestions}/>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default RIghtSideBar