import express, { Request, Response } from "express";
import { blogsRouter } from "./routes/blogs-route/blogs-router";
import { postsRouter } from "./routes/posts-route/posts-router";
import { testingRouter } from "./routes/tests-route";
import { runDB } from "./repositories/db";
import { authRouter } from "./routes/auth-route/auth-router";
import { usersRouter } from "./routes/users-route/users-route";
import { commentsRouter } from "./routes/comments-route/comments-route";
import { emailRouter } from "./routes/email-route/email-router";
import cookieParser from "cookie-parser";

// import bodyParser from "body-parser";

export const app = express();
app.use(express.json()); // используем вместо bodyParser
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);
app.use("/email", emailRouter);
app.use("/testing/all-data", testingRouter);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  let helloMessage = "version 1.00!!!";
  res.send(helloMessage);
});
