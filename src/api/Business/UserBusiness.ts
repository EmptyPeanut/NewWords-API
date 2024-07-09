import User from "../../database/Models/User";
import UserCreateBody from "../../api/RequestBodies/UserCreateBody";
import bcrypt from "bcryptjs";
import Metadata from "../../database/Models/Metadata";
import { TokenHandler } from "../../api/Tools/TokenHandler";
import Language from "../../database/Models/Language";
import UserWord from "../../database/Models/UserWord";
import Definition from "../../database/Models/Definition";

class UserBusiness
{
    public async getUserById(id: number)
    {
        return await User.findByPk(id, {include: [{model: Metadata, as: 'metadata'}]});
    }

    public async getUserWords()
    {
        const user = await User.findByPk(TokenHandler.tokenUser?.id as number);
        const userLanguage: Language = await Language.findOne({where: {iso: TokenHandler.userLanguageIso}});
        if (!userLanguage)
            throw new Error("No language found")

        return user.$get('words', {
            where: {languageId: userLanguage.id},
            include: [
                {model: UserWord, as: 'UserWord', attributes: ['createdAt', 'updatedAt']},
                {model: Definition, as: 'definitions'},
            ],
            attributes: ['word']});
    }

    public async createUser(userBody: UserCreateBody)
    {
        const hashedPwd = await bcrypt.hash(userBody.getPassword(), 10);
        const createdUser = await User.create({"email" :userBody.getEmail(), "password": hashedPwd});
        const user = await User.findByPk(createdUser.id);
        return {user: user, token: TokenHandler.create(user.id)};
    }
}

export default UserBusiness;