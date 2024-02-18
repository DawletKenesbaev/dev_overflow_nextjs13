"use client"
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { questionSchema } from "@/lib/validation"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { createQuestion, editQuestion } from '@/lib/actions/question.action';
import { useRouter ,usePathname} from 'next/navigation';
import { useTheme } from '@/context/ThemeProvider';

interface Props {
  type?:string;
  questionDetails?: string;
  mongoUserId:string
}

const Question = ({mongoUserId,type,questionDetails}:Props) => {
    const {mode} = useTheme()
    const editorRef = useRef(null);
    const [isSubmitting,setIsSubmitting] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const parsedQuestionDetails = questionDetails && JSON.parse(questionDetails)
    const groupTags = parsedQuestionDetails?.tags.map((tag:any) => tag.name)
    const form = useForm<z.infer<typeof questionSchema>>({
        resolver: zodResolver(questionSchema), 
        defaultValues: {
          title: parsedQuestionDetails?.title || '',
          explanation: parsedQuestionDetails?.content || '',
          tags: groupTags || [],
        },
      })
async function onSubmit(values: z.infer<typeof questionSchema>) {   
   setIsSubmitting(true);
   try {
     if (type==='Edit') {
      await  editQuestion({
         questionId:parsedQuestionDetails._id,
         title: values.title,
         content:values.explanation,
         path:pathname,
         
      })

      router.push(`/question/${parsedQuestionDetails._id}`)
     } else {
      await  createQuestion({
        title:values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path:pathname
        
      })

      router.push('/')
     }
     
   } catch (error) {
     console.log('error',error);
     
   } finally  {
    setIsSubmitting(false)
   }
}
const handleInputDown = (e:React.KeyboardEvent<HTMLInputElement>,field: any) => {
    if (e.key === 'Enter' && e.target && field.name === 'tags') {
        e.preventDefault();
        const tagInput = e.target as HTMLInputElement;
        const tagValue = tagInput.value.trim();
        if (tagValue.length>15) {
          return form.setError('tags', 
          {
            type: 'required',
            message: 'Tag must be at least 15 characters.'
          }
          )
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags',[...field.value,tagValue])
          tagInput.value = ''
          form.clearErrors('tags')
        }
        form.trigger()
    }
};
const handleTagRemove =(tag:string,field:any) => {
   const newTags  = field.value.filter((t:string) =>  t!== tag)
   form.setValue('tags', newTags)
}
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}
     className="flex w-full flex-col gap-10">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title
                <span className="text-primary-500">*</span>
            </FormLabel>
            <FormControl  className="mt-4">
              <Input 
              className="no-focus paragraph-regular background-light700_dark300
              light-border-2 text-dark300_light900  min-h-[50px] border" {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-3 text-light-500">
              Be specific and imagine you are asking a question to another person
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="explanation"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">
                Detail explanation of your problem
                <span className="text-primary-500">*</span>
            </FormLabel>
            <FormControl  className="mt-4">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                onInit={(evt, editor) =>
                   // @ts-ignore
                   (editorRef.current = editor)}
                initialValue={parsedQuestionDetails?.content || ''}
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
                skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                content_css: mode==='dark' ? 'dark': 'light',
                content_style: 'body { font-family:Inter; font-size:17px }'
                }}
                />
            </FormControl>
            <FormDescription className="body-regular mt-3 text-light-500">
               Introduce the problem and expand what you put in the title .Minumum 20 characters
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags
                <span className="text-primary-500">*</span>
            </FormLabel>
            <FormControl  className="mt-4">
              <>
              <Input 
              disabled={type ==='Edit'}
              className="no-focus paragraph-regular background-light700_dark300
              light-border-2 text-dark300_light900  min-h-[50px] border" placeholder="Add tags..."
              onKeyDown={(e) => handleInputDown(e,field)}
              />
               
                 {Array.isArray(field.value) && field.value.length > 0 && (
                  <div className='flex-start mt-3 gap-3'>
                    {field.value.map((tag) => (
                      <Badge key={tag} className='subtle-regular background-light800_dark300
                      text-light400_light500 items-center justify-center gap-2 rounded-md border-none
                      px-4 py-2 capitalize'
                      onClick={() =>  type !=='Edit' && handleTagRemove(tag,field)}
                      >
                        {tag}
                        {
                          type !=='Edit' && (
                            <Image
                            src='/assets/icons/close.svg'
                            alt='close'
                            width={12}
                            height={12}
                            className='cursor-pointer object-contain invert-0 dark:invert'
                          /> 
                          )
                        }
                       
                      </Badge>
                    ))}
                  </div>
                )}

             </>
            </FormControl>
            <FormDescription className="body-regular mt-3 text-light-500">
              Add up to 3 tags to describe what you question about .You need to press enter to add a tag
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <Button type="submit" className='primary-gradient w-[100px] !text-light-900'
      disabled={isSubmitting}

      >
        {
          type !=='Edit' ? (
            isSubmitting ? 'Posting...' : 'Ask a Question'
          ): (
            isSubmitting ? 'Editing...' : 'Edit a Question'
          )
        }
       </Button>
    </form>
  </Form>
  )
}

export default Question