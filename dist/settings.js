"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-route/blogs-router");
const posts_router_1 = require("./routes/posts-route/posts-router");
const tests_route_1 = require("./routes/tests-route");
// import bodyParser from "body-parser";
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json()); // используем вместо bodyParser
exports.app.use("/blogs", blogs_router_1.blogsRouter);
exports.app.use("/posts", posts_router_1.postsRouter);
exports.app.use("/testing/all-data", tests_route_1.testingRouter);
exports.app.get("/", (req, res) => {
    let helloMessage = "version 1.00!!!";
    res.send(helloMessage);
});
