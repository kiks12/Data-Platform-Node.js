
import { User } from "@prisma/client";
import express, { Request, Response, Router } from "express";


// IMPORT CONTROLLERS
import UserService from "../controllers/user";
import { authChecker } from "../middleware/authChecker";
import PasswordEncryption from "../modules/encryption";


const authRouter: Router = express.Router();

const passwordEncryption = new PasswordEncryption()
const controller = new UserService(passwordEncryption);



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

      if (!(passwordEncryption.correctPassword(password, user?.password as string))) {
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
      await controller.createUser(user);
      
      res.render("auth/register/post")
    } catch (err) {
      console.error(err)
    }
  })



export default authRouter;