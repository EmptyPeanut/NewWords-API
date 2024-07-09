import UserBusiness from "../Business/UserBusiness";
import express, {NextFunction, Request, Response, Router} from "express";
import {plainToInstance} from "class-transformer";
import UserCreateBody from "../RequestBodies/UserCreateBody";
import { TokenHandler } from "../../api/Tools/TokenHandler";

const router: Router = express.Router();
const userBusiness: UserBusiness = new UserBusiness();

router.get('/words-list', TokenHandler.handle, async (req: Request, res: Response, next: NextFunction) => {
    const result = await userBusiness.getUserWords();
    res.status(200).json(result);
})
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const result = await userBusiness.getUserById(parseInt(req.params.id));
    res.status(200).json(result);
})
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const userDto = plainToInstance(UserCreateBody, req.body);
    const result = await userBusiness.createUser(userDto);
    res.status(201).json(result);
})

export default router;