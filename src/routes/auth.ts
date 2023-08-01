
import { User } from "@prisma/client";
import express, { Request, Response, Router } from "express";
import { correctPassword, encryptString } from "../utils/encryption";


// IMPORT CONTROLLERS
import UserController from "../controllers/user";
import { authChecker } from "../middleware/authChecker";


const authRouter: Router = express.Router();
const controller = new UserController();



authRouter
  .route("/login")
  .get((_req: Request, res: Response) => {
    res.render("auth/login/get", {
      error: undefined
    })
  })
  .post(async (req: Request, res: Response) => {
    try {
      const { email, password }  = req.body as User
      const user = await controller.getUser(email)

      if (!user) {
        return res.render("auth/login/get", {
          error: "User not Found"
        });
      }

      if (!(await correctPassword(password, user?.password as string))) {
        return res.render("auth/login/get", {
          error: "Incorrect Password!"
        });
      }

      req.session.user ??= user
      res.redirect("/")
    } catch (err) {
      console.error(err)
    }
  })



authRouter
  .route("/register")
  .get((_req: Request, res: Response) => {
    res.render("auth/register/get")
  })
  .post(async (req: Request, res: Response) => {
    try {
      const user = req.body as User
      user.password = await encryptString(user.password)
      await controller.createUser(user);
      
      res.render("auth/register/post")
    } catch (err) {
      console.error(err)
    }
  })


export default authRouter;