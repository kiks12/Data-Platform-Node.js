import { NextFunction, Request, Response } from "express";
import { AuthCheckerMiddleware } from "../types/middlewares";

export const authChecker: AuthCheckerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.session.user === "undefined") {
    res.redirect("/auth/login")
    return 
  }

  next()
}