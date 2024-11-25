"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const blogs_repository_1 = require("../repositories/blogs-repository");
const express_1 = require("express");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete("/", (req, res) => {
    blogs_repository_1.blogsRepository.deleteAllBlogs();
    res.send(204);
});
