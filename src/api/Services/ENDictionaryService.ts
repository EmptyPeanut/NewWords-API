import {DictionaryServiceInterface} from "../Interfaces/DictionaryServiceInterface";
import axios, {AxiosResponse} from "axios";
import { WordCreationBody } from "api/Interfaces/WordCreationBody";


export class ENDictionaryService implements DictionaryServiceInterface
{
    private baseApiUrl = process.env.WORD_API_URL_EN;
    public async getWord(word: string)
    {
        const result = await axios.get(this.baseApiUrl + word);

        return this.transformData(result);
    }

    public transformData(response: AxiosResponse): any
    {
        console.log(response.data);
        
        const data = response.data[0];
        let meanings: any = [];
        data.meanings.forEach((meaning: any) => {
            meanings.push({
                partOfSpeech:   meaning.partOfSpeech,
                example:        meaning.example,
                antonyms:       meaning.antonyms,
                synonyms:       meaning.synonyms,
            })
        })

        const result: WordCreationBody = {
            word: data.word,
            meanings: meanings
        }

        return result;
    }
}