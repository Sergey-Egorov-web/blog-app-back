"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
let blogs = [
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
exports.blogsRepository = {
    findAllBlogs() {
        return blogs;
    },
    deleteAllBlogs() {
        blogs = [];
        return blogs;
    },
    //типизировать выход
    addNewBlog(blog) {
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
