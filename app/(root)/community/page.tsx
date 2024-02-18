import UserCard from '@/components/cards/UserCard'
import Filters from '@/components/shared/Filters'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import {  UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'


const Page = async ({searchParams}:SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery:searchParams.q,
  });  
  return (

    <>
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchBar
                route ='/community'
                placeholder='Search for amazing minds'
                imgSrc='/assets/icons/search.svg'
                iconPosition="left"
                otherClasses ='flex-1'
                />
                <Filters 
                filters ={UserFilters}
                otherClasses ='min-h-[56px] sm:min-w-[170px]'
                containerClasses =''
                />
        </div>
        <section className='mt-12 flex flex-wrap gap-4'>
             {
               result.length>0 ?
                result.map((user)=>(
                    <UserCard key={user._id} user={user} />
                )) : (
                    <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
                        <p>No users yet</p>
                        <Link href='sign-up' className='mt-2 font-bold text-accent-blue'>
                           Join to be first
                        </Link>
                    </div>
                )
             }
        </section>
    </>
  )
}

export default Page