class UserCreateBody
{
    private email: string;
    private password: string;

    public getEmail(): string
    {
        return this.email;
    }
    public setEmail(email: string): UserCreateBody
    {
        this.email = email;
        return this;
    }

    public getPassword(): string
    {
        return this.password;
    }
    public setPassword(password: string): UserCreateBody
    {
        this.password = password;
        return this;
    }
}
export default UserCreateBody;