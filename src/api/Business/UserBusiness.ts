import User from "../../database/Models/User";
import UserCreateBody from "../../api/RequestBodies/UserCreateBody";
import { instanceToPlain } from "class-transformer";

class UserBusiness
{
    public async getUserById(id: number)
    {
         return await User.findByPk(id);
    }

    public async createUser(userBody: UserCreateBody)
    {
        /** @todo Hash le password + créer une metadata vide (après que le user soit créé)*/
        return await User.create({"email" :userBody.getEmail(), "password": userBody.getPassword()});
    }
}

export default UserBusiness;