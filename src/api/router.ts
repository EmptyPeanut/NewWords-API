import express from "express";

const router = express.Router();

router.use('/users', require('./Controllers/UserController').default);
router.use('/words', require('./Controllers/WordController').default);

export default router;