import express from "express";

const router = express.Router();

router.use('/users', require('./Controllers/UserController').default);

export default router;