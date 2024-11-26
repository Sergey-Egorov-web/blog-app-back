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
exports.blogsRouter.put("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, name_validation_1.nameValidation)(), (0, description_validation_1.descriptionValidation)(), (0, webSiteUrl_validation_1.webSiteUrlValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const id = req.params.id;
    const blogUpdateData = req.body;
    const updateBlog = blogs_repository_1.blogsRepository.updateBlogById(blogUpdateData, id);
    if (updateBlog) {
        res.status(201).send(updateBlog);
    }
    else {
        res.sendStatus(404);
    }
});
exports.blogsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    let blog = blogs_repository_1.blogsRepository.findBlog(id);
    if (blog) {
        res.send(blog);
    }
    else
        res.send(404);
});
exports.blogsRouter.delete("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, (req, res) => {
    const id = req.params.id;
    const answer = blogs_repository_1.blogsRepository.deleteBlogById(id);
    if (answer) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
