import Question from '@/components/forms/Question'
import React from 'react'

const Page = () => {
  return (
    <div  className=''>
        <h1 className='h1-bold text-dark100_light900 '>Ask a Questions</h1>
        <div className='mt-8'>
          <Question />  
        </div>
    </div>
  )
}

export default Page