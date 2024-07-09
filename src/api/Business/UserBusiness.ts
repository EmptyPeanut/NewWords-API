import User from "../../database/Models/User";
import UserCreateBody from "../../api/RequestBodies/UserCreateBody";
import bcrypt from "bcryptjs";
import Metadata from "../../database/Models/Metadata";
import { TokenHandler } from "../../api/Tools/TokenHandler";

class UserBusiness
{
    public async getUserById(id: number)
    {
        return await User.findByPk(id, {include: [{model: Metadata, as: 'metadata'}]});
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