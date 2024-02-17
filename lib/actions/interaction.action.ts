'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params:ViewQuestionParams) {
    try {
       await connectToDatabase()
       const {questionId,userId} = params

       await Question.findByIdAndUpdate(questionId,{
        $inc:{views:1}
       })
       if (userId) {
         const existingIn = await Interaction.findOne({
            user: userId,
            action:'view',
            question:questionId
        })
        if (existingIn) return console.log('User already viewed');
        await Interaction.create({
            user:userId,
            action: 'view',
            question:questionId
        })
        

       }


    } catch (error) {
        console.log(error);
        throw(error)
        
    }
}