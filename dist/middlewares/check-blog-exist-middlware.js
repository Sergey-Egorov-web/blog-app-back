"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBlogExistsMiddleware = void 0;
const blog_db_query_repository_1 = require("../repositories/blog-db-query-repository");
const checkBlogExistsMiddleware = (req, res, next) => {
    const blogId = req.body.blogId;
    // req.body.blogId;
    const blog = blog_db_query_repository_1.blogsQueryRepository.findBlogById(blogId);
    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    next();
};
exports.checkBlogExistsMiddleware = checkBlogExistsMiddleware;
