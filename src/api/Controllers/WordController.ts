import express, {NextFunction, Request, Response, Router} from "express";
import {plainToInstance} from "class-transformer";
import WordCreateBody from "../RequestBodies/WordCreateBody";
import WordBusiness from "../Business/WordBusiness";
import { TokenHandler } from "../../api/Tools/TokenHandler";

const router: Router = express.Router();
const wordBusiness: WordBusiness = new WordBusiness();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const result = await wordBusiness.getWordById(parseInt(req.params.id));
    res.status(200).json(result);
})
router.post('/:word', TokenHandler.handle, async (req: Request, res: Response, next: NextFunction) => {
    const result = await wordBusiness.getWord(req.params.word);
    res.status(201).json(result);
})

export default router;