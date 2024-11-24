import { BlogInputType, BlogOutputType } from "../types";

//TODO переделать на тип, переименовать(createBLogData), перенести
// export interface Blog {
//   // id: string;
//   name: string;
//   description: string;
//   websiteUrl: string;
// }

export type BlogDbType = {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
};

export let blogs: BlogDbType[] = [
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
  findBlog(id: Number) {
    let blog = blogs.find((p) => p.id === id);
    if (blog) {
      return blog;
    }
  },
  deleteAllBlogs() {
    blogs = [];
    return blogs;
  },

  deleteBlogById(id: Number) {
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].id === id) {
        blogs.splice(i, 1);
        return true;
      } else {
        return false;
      }
    }
  },

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

  updateBlogById(blog: BlogInputType, id: Number) {
    let updateBlog = blogs.find((p) => p.id === id);
    if (updateBlog) {
      updateBlog.name = blog.name;
      updateBlog.description = blog.description;
      updateBlog.websiteUrl = blog.websiteUrl;
      return updateBlog;
    } else {
      return undefined;
    }
  },
};
