
import express, { Express } from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import { User } from "@prisma/client";


// IMPORT ROUTERS
import authRouter from "./routes/auth";
import indexRouter from "./routes";
import { authChecker } from "./middleware/authChecker";


const app : Express = express()
const PORT = process.env.PORT ?? 3000;


// SETTING VIEW ENGINE TO EJS
app.set("view engine", "ejs");
// SETTING VIEWS DIRECTORY to ./src/views instead of ./views
app.set('views', path.join(__dirname, '/views'));



// EXTEND TYPE DECLARATION OF EXPRESS SESSION
declare module 'express-session' {
  interface SessionData {
    user: User,
  }
}

// SET EXPRESS SESSION FOR ALL ROUTES
app.use(session({
  secret: "asdkfhadfvbtwbisdgvydafgcewwdvajhrtvetthgtuybwio",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // secure: true on production
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 3, // 3 days max age
  }
}))



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())




// INTEGRATE ROUTERS TO SPECIFIC ROUTES
app.use("/", indexRouter)
app.use("/auth", authRouter)


app.listen(PORT, () => console.log(`App listening at port ${PORT}`));


export default app;