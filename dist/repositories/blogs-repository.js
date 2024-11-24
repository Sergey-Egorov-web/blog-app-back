"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogs = void 0;
exports.blogs = [
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
        return exports.blogs;
    },
    deleteAllBlogs() {
        exports.blogs = [];
        return exports.blogs;
    },
    //типизировать выход
    addNewBlog(blog) {
        const newBlog = {
            id: +new Date(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        };
        exports.blogs.push(newBlog);
        return newBlog;
    },
};
