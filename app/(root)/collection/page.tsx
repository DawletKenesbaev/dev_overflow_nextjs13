import QuestionCards from "@/components/cards/QuestionCards";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import {  QuestionFilters } from "@/constants/filters";
import { getSavedQuestion } from "@/lib/actions/user.action";
import {auth} from '@clerk/nextjs'
 
export default async function Home() {
  const {userId}  = auth()
  if (!userId) return null
  const defaultValue = {
    questions: []
  };
  const result = await getSavedQuestion({
    clerkId:userId,
  });
  const results = result ?? defaultValue;
  return (
    <>
         <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
         <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
               <LocalSearchBar
                route ='/'
                placeholder='Search questions...'
                imgSrc='/assets/icons/search.svg'
                iconPosition="left"
                otherClasses ='flex-1'
                 />
               <Filters 
               filters ={QuestionFilters}
               otherClasses ='min-h-[56px] sm:min-w-[170px]'
               />
         </div>
         <div className="mt-5">
        
            {
              results?.questions.length>0
              ? results?.questions.map((item:any) => (
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
                 />
              ))
              : <NoResults 
              title='There is no saved questions to show' 
              description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
              />
            }
         </div>
    </>
  )
}