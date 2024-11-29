"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositories = exports.posts = void 0;
const blogs_in_memory_repository_1 = require("./blogs-in-memory-repository");
exports.posts = [
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
        }
    },
    addNewPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_in_memory_repository_1.blogsRepository.findBlog(post.blogId);
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
                    blogId: blog.id,
                    blogName: blog.name,
                };
                console.log(typeof newPost.id);
                console.log(newPost.id);
                exports.posts.push(newPost);
                return newPost;
            }
            else {
                return null;
            }
        });
    },
    updatePostById(post, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatePost = exports.posts.find((p) => p.id === id);
            if (updatePost) {
                updatePost.title = post.title;
                updatePost.shortDescription = post.shortDescription;
                updatePost.content = post.content;
                updatePost.blogId = post.blogId;
                const blog = yield blogs_in_memory_repository_1.blogsRepository.findBlog(post.blogId);
                if (blog) {
                    updatePost.blogName = blog.name;
                    return updatePost;
                }
            }
            else {
                return undefined;
            }
        });
    },
};
