import User from "../../database/Models/User";
import UserCreateBody from "../../api/RequestBodies/UserCreateBody";
import bcrypt from "bcryptjs";

class UserBusiness
{
    public async getUserById(id: number)
    {
         return await User.findByPk(id);
    }

    public async createUser(userBody: UserCreateBody)
    {
        const hashedPwd = await bcrypt.hash(userBody.getPassword(), 10);
        const user = await User.create({"email" :userBody.getEmail(), "password": hashedPwd});
        return await User.findByPk(user.id);
    }
}

export default UserBusiness;