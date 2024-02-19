import Link from 'next/link';
import React from 'react'
import Metric from '../shared/Metric';
import { formatNumber, getTimeStap } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';
interface Props {
_id: number;
author: {
    _id:string;
    name:string;
    picture: string;
    clerkId?: string
};
question: {
    _id:string,
    title:string;
};
upvotes: number;
createdAt: Date;
clerkId?:string | null;
}

const AnswerCard = ({_id,question,author,upvotes,createdAt,clerkId}:Props) => {    
  const showActionButtons = clerkId && clerkId === author.clerkId

  return ( 
    <div className='card-wrapper   rounded-[10px] p-9 sm:px-11'>
         <div className='flex
         flex-col-reverse items-start justify-between gap-5
         sm:flex-row '>
            <span className='subtle-regular text-dark400_light700
            line-clamp-1 flex sm:hidden'>
                 {getTimeStap(createdAt)}
            </span> 
            <Link href={`/question/${_id}`}>
               <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
                {question.title}
               </h3>
            </Link> 
            <SignedIn>
              {showActionButtons &&(
                <EditDeleteAction
                 type='Answer'
                 itemId = {JSON.stringify(_id)}
                 />
              )}
          </SignedIn>  
         </div>
         <div className='flex-between mt-6 w-full flex-wrap gap-3'>
             <Metric
             imgUrl={author.picture}
             alt='user'
             value={author.name}
             title={` - asked ${getTimeStap(createdAt)}`}
             href={`/profile/${author._id}`}
             isAuthor
             textStyles='body-medium text-dark400_light700'
              />
             <Metric
             imgUrl='/assets/icons/like.svg'
             alt='Upvotes'
             value={formatNumber(upvotes)}
             title=' Votes'
             textStyles='small-medium text-dark400_light800'
              />
         </div>
    </div>
  )
}

export default AnswerCard