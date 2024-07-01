export interface DictionaryServiceInterface {
    getWord(word: string): Promise<any>;
}