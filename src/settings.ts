import express, { Request, Response } from "express";

// import bodyParser from "body-parser";

export const app = express();

let blogs = [
  {
    id: +new Date(),
    name: "myBlog",
    description: "blog about me",
    websiteUrl: "aboutme@yandex.ru",
  },
];

app.get("/", (req: Request, res: Response) => {
  let helloMessage = "version 1.00!!!";
  res.send(helloMessage);
});

app.get("/blogs", (req: Request, res: Response) => {
  res.send(blogs);
});
