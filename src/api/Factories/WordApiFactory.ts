import {TokenHandler} from "../Tools/TokenHandler";
import User from "../../database/Models/User";
import Metadata from "../../database/Models/Metadata";
import {DictionaryServiceInterface} from "../Interfaces/DictionaryServiceInterface";
import {ENDictionaryService} from "../Services/ENDictionaryService";
import Language from "../../database/Models/Language";

export class WordApiFactory
{
    public findService(): DictionaryServiceInterface {
        // const userId = TokenHandler.tokenUserId;
        // const user = await User.findByPk(userId, {include: {model: Metadata, as: "metadata"}});
        // switch (user.metadata.language){
        switch ('en'){
            case "en":
                return new ENDictionaryService();
            // ...
            default:
                throw new Error("No api found for this language");
        }
    }
}