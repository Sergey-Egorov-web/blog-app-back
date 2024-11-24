"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_repository_1 = require("../../repositories/blogs-repository");
const blogs_router_1 = require("./blogs-router");
//TODO вынести
blogs_router_1.blogsRouter.delete("/testing/all-data", (req, res) => {
    blogs_repository_1.blogsRepository.deleteAllBlogs();
    res.send(204);
});
