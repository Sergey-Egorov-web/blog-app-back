"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBlogExistsMiddleware = void 0;
const blogs_service_1 = require("../domains/blogs-service");
const checkBlogExistsMiddleware = (req, res, next) => {
    const blogId = req.body.blogId;
    // req.body.blogId;
    const blog = blogs_service_1.blogsService.findBlog(blogId);
    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    next();
};
exports.checkBlogExistsMiddleware = checkBlogExistsMiddleware;
