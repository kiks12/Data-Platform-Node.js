
import express, { Response, Request, Router } from "express";
import { authChecker } from "../middleware/authChecker";

const indexRouter: Router = express.Router();


indexRouter
  .route("/")
  .get(authChecker, (req: Request, res: Response) => {

    res.redirect("/labeling")
    // res.render("index/get")
  })


export default indexRouter;