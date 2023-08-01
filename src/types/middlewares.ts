import { NextFunction, Request, Response } from "express";

export type AuthCheckerMiddleware = (req: Request, res: Response, next: NextFunction) => void