import bodyParser from "body-parser";
import cors from "cors";
import { NextFunction, Request, Response } from "express";
import express from "express";

function createServer() {

    const app = express();

    app.use(cors({credentials: true}))
    app.use(bodyParser.json());
    app.use('/api', require('../api/router').default);

    // app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    //     if (err instanceof ValidationError) {
    //         res.status(500).json({
    //             code: 500,
    //             message: err.message
    //         });
    //     }else {
    //         next(err);
    //     }
    // })

    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.status(404).json({
            code: 404,
            message: 'Not found'
        });
    })

    return app;
}

export default createServer;