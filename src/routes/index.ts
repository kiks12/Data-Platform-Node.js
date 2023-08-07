
import express, { Response, Request, Router } from "express";
import { authChecker } from "../middleware/authChecker";

const indexRouter: Router = express.Router();


indexRouter
  .route("/")
  .get(authChecker, (req: Request, res: Response) => {

    res.redirect("/labeling")
  })


export default indexRouter;