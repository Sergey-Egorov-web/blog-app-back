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
exports.checkBlogExistsMiddleware = void 0;
const blog_db_query_repository_1 = require("../repositories/blog-db-query-repository");
const checkBlogExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    // req.body.blogId;
    const blog = yield blog_db_query_repository_1.blogsQueryRepository.findBlogById(blogId);
    if (!blog) {
        res.status(404).send("Blog not found");
    }
    else {
        next();
    }
});
exports.checkBlogExistsMiddleware = checkBlogExistsMiddleware;
