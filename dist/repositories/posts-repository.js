"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositories = exports.posts = void 0;
const blogs_repository_1 = require("./blogs-repository");
exports.posts = [
    {
        id: 1,
        title: "firstPost",
        shortDescription: "it is small description",
        content: "we will make a lot of content today and i the future",
        blogId: "1",
        blogName: "myBlog",
    },
    {
        id: 2,
        title: "firstPost",
        shortDescription: "it is small description",
        content: "we will make a lot of content today and i the future",
        blogId: "2",
        blogName: "denBlog",
    },
];
exports.postRepositories = {
    findAllPosts() {
        return exports.posts;
    },
    findPost(id) {
        let post = exports.posts.find((p) => p.id === id);
        if (post) {
            return post;
        }
    },
    deleteAllPosts() {
        exports.posts = [];
        return exports.posts;
    },
    deletePostById(id) {
        for (let i = 0; i < exports.posts.length; i++) {
            if (exports.posts[i].id === id) {
                exports.posts.splice(i, 1);
                return true;
            }
            else {
                return false;
            }
        }
    },
    addNewPost(post) {
        const blog = blogs_repository_1.blogsRepository.findBlog(+post.blogId);
        //   if (blog) {
        //     updatePost.blogName = blog.name;
        //     return updatePost;
        //   }
        // } else {
        //   return undefined;
        // }
        if (blog) {
            const newPost = {
                id: +new Date(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: blog.name,
            };
            exports.posts.push(newPost);
            return newPost;
        }
        else {
            return undefined;
        }
    },
    updatePostById(post, id) {
        let updatePost = exports.posts.find((p) => p.id === id);
        if (updatePost) {
            updatePost.title = post.title;
            updatePost.shortDescription = post.shortDescription;
            updatePost.content = post.content;
            updatePost.blogId = post.blogId;
            const blog = blogs_repository_1.blogsRepository.findBlog(+post.blogId);
            if (blog) {
                updatePost.blogName = blog.name;
                return updatePost;
            }
        }
        else {
            return undefined;
        }
    },
};
