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
exports.postsRouter.post("/", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, title_post_validation_1.titlePostValidation)(), (0, short_description_post_validation_1.shortDescriptionPostValidation)(), (0, content_post_validation_1.contentPostValidation)(), (0, blogId_post_validation_1.blogIdPostValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postCreateData = req.body;
    const newPost = yield posts_repository_1.postRepositories.addNewPost(postCreateData);
    if (newPost) {
        res.status(201).send(newPost);
    }
    // else {
    //   res.status(404).send("Blog not found");
    // }
}));
exports.postsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    let post = posts_repository_1.postRepositories.findPost(id);
    if (post) {
        res.send(post);
    }
    else
        res.send(404);
});
exports.postsRouter.delete("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, (req, res) => {
    const id = req.params.id;
    const answer = posts_repository_1.postRepositories.deletePostById(id);
    if (answer === true) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
exports.postsRouter.put("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, title_post_validation_1.titlePostValidation)(), (0, short_description_post_validation_1.shortDescriptionPostValidation)(), (0, content_post_validation_1.contentPostValidation)(), (0, blogId_post_validation_1.blogIdPostValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const id = req.params.id;
    const postUpdateData = req.body;
    const updatePost = posts_repository_1.postRepositories.updatePostById(postUpdateData, id);
    if (updatePost) {
        res.status(204).send(updatePost);
    }
    else {
        res.sendStatus(404);
    }
});
