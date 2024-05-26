import UserBusiness from "../Business/UserBusiness";
import express, {NextFunction, Request, Response, Router} from "express";
import {plainToInstance} from "class-transformer";
import UserCreateBody from "../RequestBodies/UserCreateBody";

const router: Router = express.Router();
const userBusiness: UserBusiness = new UserBusiness();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.json("hello");
})
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const userDto = plainToInstance(UserCreateBody, req.body);
    const result = await userBusiness.createUser(userDto);
    res.status(201).json(result);
})

export default router;