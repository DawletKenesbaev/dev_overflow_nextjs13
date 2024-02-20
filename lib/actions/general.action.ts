'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";
const searchAbletypes = ['question','answer','user','tag']
export async function globalSearch(params: SearchParams) {
    try {
        connectToDatabase();
        const { query, type } = params;
        const regex = { $regex: query, $options: 'i' };

        let results = [];
        const modelsAndTypes = [
            { model: Question, searchField: 'title', type: 'question' },
            { model: User, searchField: 'name', type: 'user' },
            { model: Answer, searchField: 'content', type: 'answer' },
            { model: Tag, searchField: 'name', type: 'tag' },
        ];

        if (!type || searchAbletypes.includes(type.toLowerCase())) {
            for (const { model, searchField, type: modelType } of modelsAndTypes) {
                if (!type || type.toLowerCase() === modelType) {
                    const queryResults = await model.find({ [searchField]: regex }).limit(2);
                    results.push(
                        ...queryResults.map((item: any) => ({
                            title: modelType === 'answer' ? `Answers containing ${query}` : item[searchField],
                            type: modelType,
                            id: modelType === 'user' ? item.clerkId : modelType === 'answer' ? item.question : item._id
                        }))
                    );
                }
            }
        } else {
            const modelInfo = modelsAndTypes.find(item => item.type === type);
            if (!modelInfo) {
                throw new Error("Invalid search type");
            }
            const queryResults = await modelInfo.model.find({ [modelInfo.searchField]: regex }).limit(8);

            results = queryResults.map((item: any) => ({
                title: type === 'answer' ? `Answers containing ${query}` : item[modelInfo.searchField],
                type,
                id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id
            }));
        }
        return JSON.stringify(results);
    } catch (error) {
        console.log(error);
        throw new Error("Global Search");
    }
}
