import QuestionCards from "@/components/cards/QuestionCards";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
 


const questions = [
  {
    _id: 1,
    title: 'Best practices for data fetching in a Next.js application',
    tags: [{ _id: '1', name: 'nextjs' }, { _id: '2', name: 'js' }],
    author: {
      _id: '123',
      name: 'Derek Joush',
      picture: 'path/to/picture.jpg'
    },
    upvotes: 12,
    views: 1200,
    answers: [{ answerId: 1, text: 'Sample answer' }], // Example of answer object
    createdAt: new Date('2024-01-01') // Example date
  }
];
export default function Home() {
  return (
    <div className="mt-28">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="h1-bold text-dark100_light900">All Questions</h1>
          <Link href='/ask-questions' className="flex justify-end max-sm:w-full ">
              <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                Ask Questions
              </Button>
          </Link>
         </div>
         <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
               <LocalSearchBar
                route ='/'
                placeholder='Search questions...'
                imgSrc='/assets/icons/search.svg'
                iconPosition="left"
                otherClasses ='flex-1'
                 />
               <Filters 
               filters ={HomePageFilters}
               otherClasses ='min-h-[56px] sm:min-w-[170px]'
               containerClasses ='hidden max-md:flex'
               />
         </div>
         <HomeFilters />
         <div className="mt-5">
            {
              questions.length>0
              ? questions.map((item) => (
                <QuestionCards
                key={item._id}
                _id={item._id}
                title={item.title}
                tags ={item.tags}
                author={item.author}
                upvotes={item.upvotes}
                views={item.views}
                answers={item.answers}
                createdAt={item.createdAt}
                 />
              ))
              : <NoResults 
              title='Ask Questions' 
              description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
              />
            }
         </div>
    </div>
  )
}