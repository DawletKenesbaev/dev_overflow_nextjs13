import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react'
import QuestionCards from '../cards/QuestionCards';

interface Props extends SearchParamsProps {
    userId:string;
    clerkId?:string | null;
}

const QuestionTab = async ({searchParams,userId,clerkId}:Props) => {
  const result = await getUserQuestions({userId})
  return (
    <div>
        {result.question.map((item)=>(
            <QuestionCards
            key={item._id} 
            _id={item._id}
            title={item.title}
            tags ={item.tags}
            author={item.author}
            upvotes={item.upvotes.length}
            views={item.views}
            answers={item.answers}
            createdAt={item.createdAt}
            clerkId={clerkId} 
             />
        ))}
    </div>
  )
}

export default QuestionTab