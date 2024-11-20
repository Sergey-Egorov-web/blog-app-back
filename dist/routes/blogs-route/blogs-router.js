"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
exports.blogsRouter = (0, express_1.Router)({});
let blogs = [
    {
        id: +new Date(),
        name: "myBlog",
        description: "blog about me",
        websiteUrl: "aboutme@yandex.ru",
    },
];
exports.blogsRouter.get("/", (req, res) => {
    res.send(blogs);
});
