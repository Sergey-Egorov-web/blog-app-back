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
const auth_router_1 = require("./routes/auth-route/auth-router");
const users_route_1 = require("./routes/users-route/users-route");
const comments_route_1 = require("./routes/comments-route/comments-route");
const email_router_1 = require("./routes/email-route/email-router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import bodyParser from "body-parser";
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json()); // используем вместо bodyParser
exports.app.use("/blogs", blogs_router_1.blogsRouter);
exports.app.use("/posts", posts_router_1.postsRouter);
exports.app.use("/auth", auth_router_1.authRouter);
exports.app.use("/users", users_route_1.usersRouter);
exports.app.use("/comments", comments_route_1.commentsRouter);
exports.app.use("/email", email_router_1.emailRouter);
exports.app.use("/testing/all-data", tests_route_1.testingRouter);
exports.app.use((0, cookie_parser_1.default)());
exports.app.get("/", (req, res) => {
    let helloMessage = "version 1.00!!!";
    res.send(helloMessage);
});
