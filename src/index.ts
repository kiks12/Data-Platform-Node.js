
import express, { Express, Response, Request} from "express";

const app : Express = express()
const PORT = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
})


app.listen(PORT, () => console.log(`App listening at port ${PORT}`));


export default app;