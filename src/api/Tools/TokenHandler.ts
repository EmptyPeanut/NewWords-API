import User from "../../database/Models/User";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
// import { CustomError } from "./ErrorHandler";

export class TokenHandler
{
    static tokenUser?: User|null = null;
    static userLanguageIso?: string|null = null;

    static async handle(req: Request, res: Response, next: NextFunction)
    {
        const token: string = req.headers['authorization'].split(' ')[1];
        try {
            const decodedToken: string|jwt.JwtPayload = jwt.verify(token, process.env.SECRET_KEY);
            const tokenUserId = TokenHandler.getDocumentProperty(decodedToken, 'id') as number;
            const user = await User.findByPk(tokenUserId)
            
            TokenHandler.tokenUser = user;
            TokenHandler.userLanguageIso = user?.metadata?.language.iso;
        } catch (err) {
            // next(new CustomError("Invalid Token", 403))
            console.log(err);
        }
        return next();
    }

    static create(userId: number)
    {
        const token = jwt.sign(
            { id: userId}, process.env.SECRET_KEY, {expiresIn: '7d'}
        );
        return token;
    }

    // static isSameUser(req: Request, res: Response, next: NextFunction)
    // {
    //     if(!req.params.id) {
    //         next(new CustomError("No identifier given"));
    //     }
    //     if (parseInt(req.params.id) != TokenHandler.tokenUserId) {
    //         next(new CustomError("You can't do that for another user", 403));
    //     }
    //     return next();
    // }

    private static getDocumentProperty (object: any, idKey: string) {
        let result;

        if (object) {
            type MyObjectKey = keyof typeof object;
            const myId = idKey as MyObjectKey;
            result = object[myId];
        }

        return result;
    }

}