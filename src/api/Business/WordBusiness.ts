import Word from "../../database/Models/Word";
import WordCreateBody from "../../api/RequestBodies/WordCreateBody";
import {WordApiFactory} from "../Factories/WordApiFactory";

class WordBusiness
{

    public async getWordById(id: number)
    {
         return await Word.findByPk(id);
    }

    public async getExternalWord(word: string)
    {
        const wordApiFactory = new WordApiFactory();
        const wordService= wordApiFactory.findService();
        const foundWord = await wordService.getWord(word);

        if (!foundWord)
            throw new Error("No word found");

        const existingWord = await Word.findOne({where: {word: foundWord.word}});
        if (existingWord)
            return existingWord;

        // const newWord = Word.create({
        //     word: foundWord.word,
        //
        // })
        return;
    }

    public async getWord(word: string)
    {
        return Word.findOne({where: {word: word}});
    }
}

export default WordBusiness;