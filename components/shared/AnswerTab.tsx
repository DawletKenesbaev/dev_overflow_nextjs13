import { SearchParamsProps } from '@/types';
import React from 'react'
import { getUserAnswers } from '@/lib/actions/user.action';
import AnswerCard from '../cards/AnswerCard';

interface Props extends SearchParamsProps {
    userId:string;
    clerkId?:string | null;
}

const AnswerTab =async ({searchParams,userId,clerkId}:Props) => {
    const result = await getUserAnswers({userId})    
  return (
    <div>
        {result.answers.map((item)=>(
           <AnswerCard
           key={item._id}
           clerkId={clerkId} 
            _id={item._id}
            question={item.question}
            author={item.author}
            upvotes={item.upvotes.length}
            createdAt={item.createdAt}
            />
        ))}
    </div>
  )
}

export default AnswerTab