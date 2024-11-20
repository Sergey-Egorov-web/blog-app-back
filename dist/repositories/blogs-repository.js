"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
let blogs = [
    {
        id: +new Date(),
        name: "myBlog",
        description: "blog about me",
        websiteUrl: "aboutme@yandex.ru",
    },
    {
        id: +new Date(),
        name: "denBlog",
        description: "blog about Den",
        websiteUrl: "den@yandex.ru",
    },
];
exports.blogsRepository = {
    findAllBlogs() {
        return blogs;
    },
};
