import {
  BlogInputType,
  BlogOutputType,
} from "../routes/blogs-route/blogs-router";

//TODO переделать на тип, переименовать(createBLogData), перенести
export interface Blog {
  // id: string;
  name: string;
  description: string;
  websiteUrl: string;
}

export type BlogDbType = {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
};

let blogs: BlogDbType[] = [
  {
    id: 1,
    name: "myBlog",
    description: "blog about me",
    websiteUrl: "aboutme@yandex.ru",
  },

  {
    id: 2,
    name: "denBlog",
    description: "blog about Den",
    websiteUrl: "den@yandex.ru",
  },
];

export const blogsRepository = {
  findAllBlogs() {
    return blogs;
  },
  deleteAllBlogs() {
    blogs = [];
    return blogs;
  },

  //типизировать выход
  addNewBlog(blog: BlogInputType): BlogOutputType {
    const newBlog = {
      id: +new Date(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
    };

    blogs.push(newBlog);
    return newBlog;
  },
};
