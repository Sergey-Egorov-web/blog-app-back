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
exports.blogsRouter = void 0;
const express_1 = require("express");
const input_validation_middleware_1 = require("../../middlewares/input-validation-middleware");
const basic_authorization_middleware_1 = require("../../middlewares/basic-authorization-middleware");
const description_validation_1 = require("../../middlewares/description-validation");
const webSiteUrl_validation_1 = require("../../middlewares/webSiteUrl-validation");
const name_validation_1 = require("../../middlewares/name-validation");
const blogs_service_1 = require("../../domains/blogs-service");
exports.blogsRouter = (0, express_1.Router)({});
// blogsRouter.use(express.json());
const ITINCUBATOR = (req, res, next) => {
    console.log("IT-INCUBATOR");
    next();
};
exports.blogsRouter.use(ITINCUBATOR);
exports.blogsRouter.get("/", ITINCUBATOR, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield blogs_service_1.blogsService.findAllBlogs();
    res.status(200).send(allBlogs);
}));
exports.blogsRouter.post("/", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, name_validation_1.nameValidation)(), (0, description_validation_1.descriptionValidation)(), (0, webSiteUrl_validation_1.webSiteUrlValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogCreateData = req.body;
    const newBlog = yield blogs_service_1.blogsService.addNewBlog(blogCreateData);
    res.status(201).send(newBlog);
}));
exports.blogsRouter.put("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, name_validation_1.nameValidation)(), (0, description_validation_1.descriptionValidation)(), (0, webSiteUrl_validation_1.webSiteUrlValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blogUpdateData = req.body;
    const updateBlog = yield blogs_service_1.blogsService.updateBlogById(blogUpdateData, id);
    if (updateBlog) {
        res.status(204).send(updateBlog);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let blog = yield blogs_service_1.blogsService.findBlog(id);
    if (blog) {
        res.send(blog);
    }
    else
        res.send(404);
}));
exports.blogsRouter.delete("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const answer = yield blogs_service_1.blogsService.deleteBlogById(id);
    if (answer === true) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
