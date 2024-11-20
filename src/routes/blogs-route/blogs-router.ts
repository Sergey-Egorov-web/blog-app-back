import { Request, Response, Router } from "express";

export const blogsRouter = Router({});

let blogs = [
  {
    id: +new Date(),
    name: "myBlog",
    description: "blog about me",
    websiteUrl: "aboutme@yandex.ru",
  },
];

blogsRouter.get("/", (req: Request, res: Response) => {
  res.send(blogs);
});
