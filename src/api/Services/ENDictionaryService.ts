import {DictionaryServiceInterface} from "../Interfaces/DictionaryServiceInterface";
import axios from "axios";


export class ENDictionaryService implements DictionaryServiceInterface
{
    private baseApiUrl = process.env.WORD_API_URL_EN;
    public async getWord(word: string)
    {
        const result = await axios.get(this.baseApiUrl + word);
        return result.data;
    }
}