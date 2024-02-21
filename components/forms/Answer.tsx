'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Form, FormControl,  FormField, FormItem,FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { answerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from '@/context/ThemeProvider'
import { Button } from '../ui/button'
import {LoadingOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { createAnswer } from '@/lib/actions/answer.action'
import { usePathname } from 'next/navigation'
import { toast } from '../ui/use-toast'

interface Props {
  question:string;
  questionId:string;
  authorId:string;
}

const Answer = ({question,questionId,authorId}:Props) => {
  const pathname = usePathname()
  const [editorKey, setEditorKey] = useState(0);
  const {mode} = useTheme()
  const [isSubmittingAI,setIsSubmittingAI] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const toggleEditorKey = () => {
    setEditorKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    
    toggleEditorKey()
    
  }, [mode])
  
  const editorRef = useRef(null)
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues:{
        answer:''
    }
  })
  const handleCreateAnswer = async (values: z.infer<typeof answerSchema>) =>{
    setIsSubmitting(true)
    try {
      await createAnswer({
          content: values.answer,
          author:JSON.parse(authorId),
          question:JSON.parse(questionId),
          path: pathname
      })
      form.reset();
      if (editorRef.current) {
          const editor = editorRef.current as any;
          editor.setContent('')
      }
      return toast({
        title:'Your answered the question'
      });     
    } catch (error) {
      console.log(error);
      
    } finally {
      setIsSubmitting(false)
    }
  }
  const generateAIAnswer  = async () =>{    
     if (!authorId) return;
     setIsSubmittingAI(true )
     try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
       {   
        method:'POST',
        body: JSON.stringify({question})

       })
       const aiAnswer = await response.json()

       const formattedAnswer  = aiAnswer.reply.replace(/\n/g, '<br />')

       if (editorRef.current) {
          const editor = editorRef.current as any
          editor.setContent(formattedAnswer)
       } 
       setIsSubmittingAI(false)
      return toast({
        title:'Your answer generated',
        description:''
      });         
     } catch (error) {
      
     } finally {
      setIsSubmittingAI(false)
     }
  }
  return (
    <div>
      <div className='mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
        <h4 className='paragraph-semibold text-dark400_light800'>Write your answer here</h4>
        <Button 
        onClick={generateAIAnswer}
        className=' btn light-border-2 gap-2 rounded-md px-4 py-3 text-primary-500 shadow-none dark:text-primary-500 '>
          <Image
           src='/assets/icons/stars.svg'
           alt='star'
           width={12}
           height={12}
           className=' object-contain'
           />
           {isSubmittingAI ? 'Generating...':'Generate AI answer'}
        </Button>
      </div>
        <Form {...form}>
       <form className='mt-6 flex flex-col gap-10'
       onSubmit={form.handleSubmit(handleCreateAnswer)}
       >
        <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormControl  className="mt-4">
              <Editor
                 key={editorKey}
                apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                onInit={(evt, editor) =>
                   // @ts-ignore
                   (editorRef.current = editor)}
                onBlur={field.onBlur}
                onEditorChange={(content) => field.onChange(content)}
                init={{
                height: 350,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'codesample', 'fullscreen', 'insertdatetime', 'media', 'table'
                ],
                toolbar: 'undo redo |' +
                'codesample | bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist ',
                content_style: 'body { font-family:Inter; font-size:17px }',
                skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                content_css: mode==='dark' ? 'dark': 'light',
                }}
                />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <div className='flex justify-end'>
      <Button type="submit" className='primary-gradient w-fit text-white'
      disabled={isSubmitting}

      >
        {
          isSubmitting ? <LoadingOutlined /> : ' Submit'
        }
       </Button>
      </div>
       </form>
    </Form>
    </div>
   
  )
}

export default Answer