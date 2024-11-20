"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => {
    const allBlogs = blogs_repository_1.blogsRepository.findAllBlogs();
    res.send(allBlogs);
});
