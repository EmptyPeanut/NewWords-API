import Word from "../../database/Models/Word";
import WordCreateBody from "../../api/RequestBodies/WordCreateBody";
import {WordApiFactory} from "../Factories/WordApiFactory";
import Language from "../../database/Models/Language";
import { WordCreationBody } from "../../api/Interfaces/WordCreationBody";
import { TokenHandler } from "../../api/Tools/TokenHandler";
import Definition from "../../database/Models/Definition";
import User from "../../database/Models/User";

class WordBusiness
{

    public async getWordById(id: number)
    {
        return await Word.findByPk(id, {include: [{model: Definition, as: 'definitions', attributes: ['partOfSpeech', 'example', 'antonyms', 'synonyms']}]});
    }

    public async getExternalWord(word: string, langId: number)
    {
        const wordApiFactory = new WordApiFactory();
        const wordService= wordApiFactory.findService();
        const foundWord = await wordService.getWord(word);

        if (!foundWord)
            throw new Error("No word found");

        const createdWord = await this.createWord(foundWord, langId);
        return createdWord;
    }

    public async createWord(wordBody: WordCreationBody, langId: number)
    {
        const word = await Word.create({
            word: wordBody.word,
            languageId: langId
        });
        wordBody.meanings.forEach(async (meaning) => {
            await Definition.create({
                partOfSpeech:   meaning.partOfSpeech,
                example:        meaning.example,
                antonyms:       meaning.antonyms,
                synonyms:       meaning.synonyms,
                wordId:         word.id
            });
        })
        return word;
    }

    public assignWordToUser(word: Word, userId: number)
    {
        return word.$add('users', userId);
    }

    public async getWord(word: string)
    {
        const language = await Language.findOne({where: {iso: TokenHandler.userLanguageIso}});
        const foundWord: null|Word = await Word.findOne({where: {word: word}, include: [{model: Definition, as: 'definitions', attributes: ['partOfSpeech', 'example', 'antonyms', 'synonyms']}]});
        if (!foundWord) {
            return await this.getExternalWord(word, language.id);
        }
        return foundWord;
    }

    public async addWordToUser(word: string)
    {
        const foundWord = await this.getWord(word);
        return await this.assignWordToUser(foundWord, TokenHandler.tokenUser?.id as number);
    }
}

export default WordBusiness;