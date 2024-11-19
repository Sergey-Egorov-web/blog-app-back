"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import bodyParser from "body-parser";
exports.app = (0, express_1.default)();
let blogs = [
    {
        id: +new Date(),
        name: "myBlog",
        description: "blog about me",
        websiteUrl: "aboutme@yandex.ru",
    },
];
exports.app.get("/", (req, res) => {
    let helloMessage = "version 1.00!!!";
    res.send(helloMessage);
});
exports.app.get("/blogs", (req, res) => {
    res.send(blogs);
});
