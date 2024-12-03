import express, { Request, Response } from "express";
import { blogsRouter } from "./routes/blogs-route/blogs-router";
import { postsRouter } from "./routes/posts-route/posts-router";
import { testingRouter } from "./routes/tests-route";
import { runDB } from "./repositories/db";

// import bodyParser from "body-parser";

export const app = express();
app.use(express.json()); // используем вместо bodyParser
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/testing/all-data", testingRouter);

app.get("/", (req: Request, res: Response) => {
  let helloMessage = "version 1.00!!!";
  res.send(helloMessage);
});


