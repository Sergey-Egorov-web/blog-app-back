import { BlogInputType, BlogOutputType } from "../types";

export type BlogDbType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export let blogs: BlogDbType[] = [
  {
    id: "1",
    name: "myBlog",
    description: "blog about me",
    websiteUrl: "aboutme@yandex.ru",
  },

  {
    id: "2",
    name: "denBlog",
    description: "blog about Den",
    websiteUrl: "den@yandex.ru",
  },
];

export const blogsRepository = {
  findAllBlogs() {
    return blogs;
  },
  findBlog(id: string) {
    let blog = blogs.find((p) => p.id === id);
    if (blog) {
      return blog;
    }
  },
  deleteAllBlogs() {
    blogs = [];
    return blogs;
  },

  deleteBlogById(id: string) {
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].id === id) {
        blogs.splice(i, 1);

        return true;
      }
    }
    // console.log(false);
    // return false;
  },

  addNewBlog(blog: BlogInputType): BlogOutputType {
    const newBlog = {
      id: Date.now().toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
    };
    // console.log(typeof newBlog.id);
    // console.log(newBlog.id);
    blogs.push(newBlog);
    return newBlog;
  },

  updateBlogById(blog: BlogInputType, id: string) {
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
