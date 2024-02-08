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


const Question = () => {
     const [tags, setTags] = useState<string[]>([]);
    const editorRef = useRef(null);
    const register = useRef('');

    const form = useForm<z.infer<typeof questionSchema>>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
          title: "",
          explanation: "",
          tags: [],
        },
      })
    
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof questionSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

  // const handleInputDown = (e :React.KeyboardEvent<HTMLInputElement>
  //   ,field:any) => {
  //     if (e.key === 'Enter' && field.name ==='tags') {
  //        e.preventDefault()
  //        const tagInput = e.target as HTMLInputElement;
  //        const tagValue = tagInput.value.trim()                  
  //        if (tagValue !== '') {
  //          if (tagValue.length>15) {
  //            return form.setError('tags',{  
  //             type:'required',
  //             message: 'Tag must be less than 15 characters.'
  //            })
  //          } 
          
                   
  //          const fieldArray: string[] = [];
  //            if (fieldArray.includes(tagValue)) {
  //             fieldArray.push(tagValue)           
  //             form.setValue('tags', [...fieldArray])
  //             form.clearErrors('tags')  
  //             tagInput.value =''
  //             console.log('click');

  //          }
          
  //        }
  //        else {
  //         form.trigger()
  //        }
         
  //     }
  // }
  const handleInputDown = (e:React.KeyboardEvent<HTMLInputElement>,field: any) => {
    if (e.key === 'Enter' && e.target && field.name === 'tags') {
        const tagInput = e.target as HTMLInputElement;
        const tagValue = tagInput.value.trim();
        e.preventDefault();
        setTags([...tags,tagValue])
        console.log(tagInput.value);

        tagInput.value =''
        register.current=''
        // if (tagValue !== '') {
        //     if (tagValue.length > 15) {
        //         return form.setError('tags', {
        //             type: 'required',
        //             message: 'Tag must be less than 15 characters.'
        //         });
        //     }    
        //     console.log(field.value);
                    
        //     if (!field.value.includes(tagValue)) {
        //         setTags([...tags, tagValue]);
        //         form.setValue('tags', [...field.value, tagValue]);
        //         tagInput.value = ''; 
        //         form.clearErrors('tags');
                
        //     } else {
        //         console.log('Tag value is already included:', tagValue);
        //     }
        // } else {
        //     form.trigger();
        // }
    }
};
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
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                height: 350,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'codesample', 'fullscreen', 'insertdatetime', 'media', 'table'
                ],
                toolbar: 'undo redo |' +
                'codesample | bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist ',
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
              className="no-focus paragraph-regular background-light700_dark300
              light-border-2 text-dark300_light900  min-h-[50px] border" {...field} placeholder="Add tags..."
              onKeyDown={(e) => handleInputDown(e,field)}
              />
               
                 {Array.isArray(tags) && tags.length > 0 && (
                  <div className='flex-start mt-3 gap-3'>
                    {tags.map((tag) => (
                      <Badge key={tag}>
                        {tag}
                        <Image
                          src='/assets/icons/close.svg'
                          alt='close'
                          width={12}
                          height={12}
                          className='cursor-pointer object-contain invert-0 dark:invert'
                        />  
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
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default Question