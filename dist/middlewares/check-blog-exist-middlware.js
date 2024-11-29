"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBlogExistsMiddleware = void 0;
const blogs_in_memory_repository_1 = require("../repositories/blogs-in-memory-repository");
const checkBlogExistsMiddleware = (req, res, next) => {
    const blogId = req.body.blogId;
    // req.body.blogId;
    const blog = blogs_in_memory_repository_1.blogsRepository.findBlog(blogId);
    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    next();
};
exports.checkBlogExistsMiddleware = checkBlogExistsMiddleware;
