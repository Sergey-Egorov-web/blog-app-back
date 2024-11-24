"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../../repositories/blogs-repository");
const input_validation_middleware_1 = require("../../middlewares/input-validation-middleware");
const basic_authorization_middleware_1 = require("../../middlewares/basic-authorization-middleware");
const description_validation_1 = require("../../middlewares/description-validation");
const webSiteUrl_validation_1 = require("../../middlewares/webSiteUrl-validation");
const name_validation_1 = require("../../middlewares/name-validation");
exports.blogsRouter = (0, express_1.Router)({});
// blogsRouter.use(express.json());
const ITINCUBATOR = (req, res, next) => {
    console.log("IT-INCUBATOR");
    next();
};
exports.blogsRouter.use(ITINCUBATOR);
exports.blogsRouter.get("/", ITINCUBATOR, (req, res) => {
    const allBlogs = blogs_repository_1.blogsRepository.findAllBlogs();
    res.status(200).send(allBlogs);
});
//TODO вынести
exports.blogsRouter.delete("/testing/all-data", (req, res) => {
    blogs_repository_1.blogsRepository.deleteAllBlogs();
    res.send(204);
});
exports.blogsRouter.post("/", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, name_validation_1.nameValidation)(), (0, description_validation_1.descriptionValidation)(), (0, webSiteUrl_validation_1.webSiteUrlValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const blogCreateData = req.body;
    const newBlog = blogs_repository_1.blogsRepository.addNewBlog(blogCreateData);
    res.status(201).send(newBlog);
});
