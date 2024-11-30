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
const blogs_db_repository_1 = require("../../repositories/blogs-db-repository");
const input_validation_middleware_1 = require("../../middlewares/input-validation-middleware");
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
exports.blogsRouter.get("/", ITINCUBATOR, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield blogs_db_repository_1.blogsRepository.findAllBlogs();
    res.status(200).send(allBlogs);
}));
//TODO вынести
exports.blogsRouter.delete("/testing/all-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blogs_db_repository_1.blogsRepository.deleteAllBlogs();
    res.send(204);
}));
exports.blogsRouter.post("/", 
// basicAuthorizationMiddleware,
(0, name_validation_1.nameValidation)(), (0, description_validation_1.descriptionValidation)(), (0, webSiteUrl_validation_1.webSiteUrlValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogCreateData = req.body;
    const newBlog = yield blogs_db_repository_1.blogsRepository.addNewBlog(blogCreateData);
    res.status(201).send(newBlog);
}));
exports.blogsRouter.put("/:id", 
// basicAuthorizationMiddleware,
(0, name_validation_1.nameValidation)(), (0, description_validation_1.descriptionValidation)(), (0, webSiteUrl_validation_1.webSiteUrlValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blogUpdateData = req.body;
    const updateBlog = yield blogs_db_repository_1.blogsRepository.updateBlogById(blogUpdateData, id);
    if (updateBlog) {
        res.status(204).send(updateBlog);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let blog = yield blogs_db_repository_1.blogsRepository.findBlog(id);
    if (blog) {
        res.send(blog);
    }
    else
        res.send(404);
}));
exports.blogsRouter.delete("/:id", 
// basicAuthorizationMiddleware,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const answer = yield blogs_db_repository_1.blogsRepository.deleteBlogById(id);
    if (answer === true) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
