export interface WordCreationBody
{
    word: string;
    meanings: Meaning[];
}

export interface Meaning
{
    partOfSpeech: string;
    synonyms: string[];
    antonyms: string[];
    example: string;
}