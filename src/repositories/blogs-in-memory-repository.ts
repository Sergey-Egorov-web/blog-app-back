import { BlogInputType, BlogOutputType } from "../types/types";

export type BlogDbType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export let blogs: BlogDbType[] = [
  // {
  //   id: "1",
  //   name: "myBlog",
  //   description: "blog about me",
  //   websiteUrl: "aboutme@yandex.ru",
  // },
  // {
  //   id: "2",
  //   name: "denBlog",
  //   description: "blog about Den",
  //   websiteUrl: "den@yandex.ru",
  // },
];

export const blogsRepository = {
  async findAllBlogs(): Promise<BlogDbType[] | null> {
    return blogs;
  },
  async findBlog(id: string): Promise<BlogOutputType | null> {
    let blog = blogs.find((p) => p.id === id);
    if (blog) {
      return blog;
    } else {
      return null;
    }
  },
  async deleteAllBlogs(): Promise<BlogDbType[] | null> {
    blogs = [];
    return blogs;
  },

  async deleteBlogById(id: string): Promise<boolean> {
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].id === id) {
        blogs.splice(i, 1);

        return true;
      }
    }
    // console.log(false);
    return false;
  },

  async addNewBlog(blog: BlogInputType): Promise<BlogOutputType> {
    const newBlog = {
      id: Date.now().toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    // console.log(typeof newBlog.id);
    // console.log(newBlog.id);
    blogs.push(newBlog);
    return newBlog;
  },

  async updateBlogById(
    blog: BlogInputType,
    id: string
  ): Promise<BlogOutputType | null> {
    let updateBlog = blogs.find((p) => p.id === id);
    if (updateBlog) {
      updateBlog.name = blog.name;
      updateBlog.description = blog.description;
      updateBlog.websiteUrl = blog.websiteUrl;
      return updateBlog;
    } else {
      return null;
    }
  },
};
