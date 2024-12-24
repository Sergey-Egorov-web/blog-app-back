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
const blog_db_query_repository_1 = require("../../repositories/blog-db-query-repository");
const posts_service_1 = require("../../domains/posts-service");
const title_post_validation_1 = require("../../middlewares/title-post-validation");
const short_description_post_validation_1 = require("../../middlewares/short-description-post-validation");
const content_post_validation_1 = require("../../middlewares/content-post-validation");
const check_blog_exist_middleware_1 = require("../../middlewares/check-blog-exist-middleware");
exports.blogsRouter = (0, express_1.Router)({});
// blogsRouter.use(express.json());
// const ITINCUBATOR = (req: Request, res: Response, next: NextFunction): void => {
//   console.log("IT-INCUBATOR");
//   next();
// };
// blogsRouter.use(ITINCUBATOR);
exports.blogsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchNameTerm = req.query.searchNameTerm
        ? req.query.searchNameTerm.toString()
        : null;
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : "createdAt";
    const sortDirection = req.query.sortDirection && req.query.sortDirection.toString() === "asc"
        ? "asc"
        : "desc";
    const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const allBlogs = yield blog_db_query_repository_1.blogsQueryRepository.findAllBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize);
    res.status(200).send(allBlogs);
}));
exports.blogsRouter.get("/:blogId", check_blog_exist_middleware_1.checkBlogExistsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId; // Извлекаем blogId из параметров пути
    const blog = yield blog_db_query_repository_1.blogsQueryRepository.findBlogById(blogId);
    res.status(200).send(blog);
}));
//__________________________________________________________________________________
exports.blogsRouter.get("/:blogId/posts", check_blog_exist_middleware_1.checkBlogExistsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId; // Извлекаем blogId из параметров пути
    const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : "createdAt";
    const sortDirection = req.query.sortDirection && req.query.sortDirection.toString() === "asc"
        ? "asc"
        : "desc";
    const allPostFromBlogId = yield blog_db_query_repository_1.blogsQueryRepository.findAllPostsByBlogId(blogId, pageNumber, pageSize, sortBy, sortDirection);
    res.status(200).send(allPostFromBlogId);
}));
//_______________________________________________________________
exports.blogsRouter.post("/:blogId/posts", basic_authorization_middleware_1.basicAuthorizationMiddleware, 
// blogIdUriParamPostValidation(),
check_blog_exist_middleware_1.checkBlogExistsMiddleware, (0, title_post_validation_1.titlePostValidation)(), (0, short_description_post_validation_1.shortDescriptionPostValidation)(), (0, content_post_validation_1.contentPostValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postCreateData = req.body;
    const blogId = req.params.blogId; // Извлекаем blogId из параметров пути
    const post = {
        title: postCreateData.title,
        shortDescription: postCreateData.shortDescription,
        content: postCreateData.content,
        blogId: blogId,
    };
    const newPost = yield posts_service_1.postService.addNewPost(post);
    res.status(201).send(newPost);
}));
exports.blogsRouter.post("/", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, name_validation_1.nameValidation)(), (0, description_validation_1.descriptionValidation)(), (0, webSiteUrl_validation_1.webSiteUrlValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogCreateData = req.body;
    const newBlog = yield blogs_service_1.blogsService.addNewBlog(blogCreateData);
    res.status(201).send(newBlog);
}));
exports.blogsRouter.put("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, 
// checkBlogExistsMiddleware,
(0, name_validation_1.nameValidation)(), (0, description_validation_1.descriptionValidation)(), (0, webSiteUrl_validation_1.webSiteUrlValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.blogsRouter.get("/:id", check_blog_exist_middleware_1.checkBlogExistsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let blog = yield blog_db_query_repository_1.blogsQueryRepository.findBlogById(id);
    if (blog) {
        res.send(blog);
    }
    else
        res.send(404);
}));
exports.blogsRouter.delete("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, 
// checkBlogExistsMiddleware,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const answer = yield blogs_service_1.blogsService.deleteBlogById(id);
    // console.log(answer);
    if (answer === true) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
