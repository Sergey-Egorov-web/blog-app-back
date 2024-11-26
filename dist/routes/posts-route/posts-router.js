"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
exports.postsRouter = (0, express_1.Router)({});
const posts_repository_1 = require("../../repositories/posts-repository");
const basic_authorization_middleware_1 = require("../../middlewares/basic-authorization-middleware");
const input_validation_middleware_1 = require("../../middlewares/input-validation-middleware");
const title_post_validation_1 = require("../../middlewares/title-post-validation");
const short_description_post_validation_1 = require("../../middlewares/short-description-post-validation");
const content_post_validation_1 = require("../../middlewares/content-post-validation");
const blogId_post_validation_1 = require("../../middlewares/blogId-post-validation");
exports.postsRouter.get("/", (req, res) => {
    const allPosts = posts_repository_1.postRepositories.findAllPosts();
    res.status(200).send(allPosts);
});
exports.postsRouter.post("/", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, title_post_validation_1.titlePostValidation)(), (0, short_description_post_validation_1.shortDescriptionPostValidation)(), (0, content_post_validation_1.contentPostValidation)(), (0, blogId_post_validation_1.blogIdPostValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const postCreateData = req.body;
    const newPost = posts_repository_1.postRepositories.addNewPost(postCreateData);
    res.status(201).send(newPost);
});
