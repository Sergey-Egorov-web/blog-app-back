import { BlogInputType, BlogOutputType } from "../types";

export type PostDbType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};

export let posts: PostDbType[] = [
  {
    id: "1",
    title: "firstPost",
    shortDescription: "it is small description",
    content: "we will make a lot of content today and i the future",
    blogId: "1",
    blogName: "myBlog",
  },

  {
    id: "2",
    title: "firstPost",
    shortDescription: "it is small description",
    content: "we will make a lot of content today and i the future",
    blogId: "2",
    blogName: "denBlog",
  },
];

export const postRepositories = {
  findAllPosts() {
    return posts;
  },
  findPost(id: string) {
    let post = posts.find((p) => p.id === id);
    if (post) {
      return post;
    }
  },
  deleteAllBlogs() {
    posts = [];
    return posts;
  },
};
