"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
exports.postsRouter = (0, express_1.Router)({});
const posts_repository_1 = require("../../repositories/posts-repository");
exports.postsRouter.get("/", (req, res) => {
    const allPosts = posts_repository_1.postRepositories.findAllPosts();
    res.status(200).send(allPosts);
});
