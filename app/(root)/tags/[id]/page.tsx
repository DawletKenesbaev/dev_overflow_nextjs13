import QuestionCards from '@/components/cards/QuestionCards'
import NoResults from '@/components/shared/NoResults'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { getQuestionsByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'
import React from 'react'

const Page = async ({params,searchParams}:URLProps) => {
 const result  = await getQuestionsByTagId({
     tagId:params.id,
     page:1,
     searchQuery:searchParams.q
 })

  return (
    <>
    <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
    <div className="mt-11 w-full">
          <LocalSearchBar
           route ={`/tags/${params.id}`}
           placeholder='Search tag questions...'
           imgSrc='/assets/icons/search.svg'
           iconPosition="left"
           otherClasses ='flex-1'
            />
        
    </div>
    <div className="mt-5">
       {
         result?.questions.length>0
         ? result?.questions.map((item:any) => {
          

          return  <QuestionCards
           key={item._id}  
           _id={item._id}
           title={item.title}
           tags ={item.tags}
           author={item.author}
           upvotes={item.upvotes.length}
           views={item.views}
           answers={item.answers}
           createdAt={item.createdAt}
            />
          })
         : <NoResults 
         title='There is no tag questions to show' 
         description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
         />
       }
    </div>
</>
  )
}

export default Page