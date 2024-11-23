"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../../repositories/blogs-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../../middlewares/input-validation-middleware");
const basic_authorization_middleware_1 = require("../../middlewares/basic-authorization-middleware");
exports.blogsRouter = (0, express_1.Router)({});
// blogsRouter.use(express.json());
const ITINCUBATOR = (req, res, next) => {
    console.log("IT-INCUBATOR");
    next();
};
exports.blogsRouter.use(ITINCUBATOR);
exports.blogsRouter.get("/", ITINCUBATOR, (req, res) => {
    const allBlogs = blogs_repository_1.blogsRepository.findAllBlogs();
    // res.send(allBlogs);
    res.status(200).send(allBlogs);
});
//TODO вынести
exports.blogsRouter.delete("/testing/all-data", (req, res) => {
    blogs_repository_1.blogsRepository.deleteAllBlogs();
    res.send(204);
});
function nameValidation() {
    return (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("name can't be empty")
        .isLength({ min: 3, max: 15 })
        .withMessage("name length must be between 3 and 15 characters");
}
const descriptionValidation = () => {
    return (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("description can't be empty")
        .isLength({ min: 10, max: 500 })
        .withMessage("description length must be between 10 and 500 characters");
};
const webSiteUrlValidation = () => {
    return (0, express_validator_1.body)("websiteUrl")
        .trim()
        .notEmpty()
        .withMessage("websiteUrl can't be empty")
        .isURL()
        .withMessage("field url must be Url")
        .isLength({ min: 3, max: 100 })
        .withMessage("websiteUrl length must be between 3 and 100 characters");
};
exports.blogsRouter.post("/", basic_authorization_middleware_1.basicAuthorizationMiddleware, nameValidation(), descriptionValidation(), webSiteUrlValidation(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const blogCreateData = req.body;
    const newBlog = blogs_repository_1.blogsRepository.addNewBlog(blogCreateData);
    res.status(201).send(newBlog);
});
