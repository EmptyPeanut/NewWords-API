import DictionaryBody from "../ResponseBodies/DictionaryBody";
import {AxiosResponse} from "axios";

export interface DictionaryServiceInterface {
    getWord(word: string): Promise<any>;
    transformData(response: AxiosResponse): any;
}