import { type Response, type NextFunction, type Request } from 'express';
import * as rfs from 'rotating-file-stream';
import path from "path";
import morgan from "morgan";

export class CustomMiddlewares {
    //* Dependency injection
    // constructor() {}

    public static writeInConsole = (_req: Request, _res: Response, next: NextFunction): void => {
        // console.log('Hello from the Middleware');
        next();
    };

    private static accessLogStream = rfs.createStream('access.log', {
        size: "10M",
        interval: '1d', // rotate daily,
        compress: "gzip",
        path: path.join(process.cwd(), 'log')
    })

    public static logToFile = morgan('combined', { stream: this.accessLogStream });

    public static logToConsole = morgan('combined');
}
