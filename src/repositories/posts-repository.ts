import { PostInputType, PostOutputType } from "../types";
import { BlogDbType, blogsRepository } from "./blogs-repository";

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
  deleteAllPosts() {
    posts = [];
    return posts;
  },
  deletePostById(id: string) {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        posts.splice(i, 1);
        return true;
      } else {
        return false;
      }
    }
  },
  addNewPost(post: PostInputType): PostOutputType | undefined {
    const blog: BlogDbType | undefined = blogsRepository.findBlog(post.blogId);
    //   if (blog) {
    //     updatePost.blogName = blog.name;
    //     return updatePost;
    //   }
    // } else {
    //   return undefined;
    // }
    if (blog) {
      const newPost = {
        id: Date.now().toString(),

        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: blog.name,
      };
      posts.push(newPost);
      return newPost;
    } else {
      return undefined;
    }
  },
  updatePostById(post: PostInputType, id: string): PostOutputType | undefined {
    let updatePost = posts.find((p) => p.id === id);
    if (updatePost) {
      updatePost.title = post.title;
      updatePost.shortDescription = post.shortDescription;
      updatePost.content = post.content;
      updatePost.blogId = post.blogId;

      const blog: BlogDbType | undefined = blogsRepository.findBlog(
        post.blogId
      );
      if (blog) {
        updatePost.blogName = blog.name;
        return updatePost;
      }
    } else {
      return undefined;
    }
  },
};
