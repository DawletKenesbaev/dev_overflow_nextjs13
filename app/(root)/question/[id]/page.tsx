import Answer from '@/components/forms/Answer';
import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import RenderTags from '@/components/shared/RenderTags';
import { getQuestionById } from '@/lib/actions/question.action'
import { formatNumber, getTimeStap } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({params}:any) => {
    const result = await getQuestionById({questionId:params.id})
    console.log(result);
    
  return (
    <>
     <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row 
           sm:items-center sm:gap-2'>
            <Link 
            className='flex items-center justify-start gap-1'
            href={`/profile/${result.author.clerkId}`}>
             <Image
              src={result.author.picture}
              alt='profile'
              className='rounded-full'
              height={22}
              width={22}
              />
              <p className='paragraph-semibold text-dark300_light700'>
                {result.author.name}
              </p>
            </Link>
            <div className='flex justify-end'>
                 Voting
            </div>
        </div>
        <h2 className='h2-semibold text-dark200_light900 mt-3 w-full text-left'>
            {result.title}
        </h2>
     </div>
     <div className='mb-8 mt-5 flex flex-wrap gap-4'>
     <Metric
             imgUrl='/assets/icons/clock.svg'
             alt='Upvotes'
             value={` asked ${getTimeStap(result.createdAt)}`}
             title=' '
             textStyles='small-medium text-dark400_light800'
              />
              <Metric
             imgUrl='/assets/icons/message.svg'
             alt='answers'
             value={formatNumber(result.answers.length)}
             title=' Answers'
             textStyles='small-medium text-dark400_light800'
              />
              <Metric
             imgUrl='/assets/icons/eye.svg'
             alt='Views'
             value={formatNumber(result.views)}
             title=' Views'
             textStyles='small-medium text-dark400_light800'
              />
     </div>
     <ParseHTML data={result.content} />
     <div className='mt-8 flex flex-wrap gap-2'>
       {
        result.tags.map((tag:any)=>(
          <RenderTags key={tag._id} _id={tag._id} title={tag.name}  showCount={false} />
        ))
       }
     </div>
     <Answer />
    </>
  )
}

export default page