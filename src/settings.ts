import express, { Request, Response } from "express";
import { blogsRouter } from "./routes/blogs-route/blogs-router";

// import bodyParser from "body-parser";

export const app = express();
app.use(express.json()); // используем вместо bodyParser
app.use("/blogs", blogsRouter);

app.get("/", (req: Request, res: Response) => {
  let helloMessage = "version 1.00!!!";
  res.send(helloMessage);
});
