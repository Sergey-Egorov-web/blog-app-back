"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = __importStar(require("express"));
const blogs_repository_1 = require("../../repositories/blogs-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../../middlewares/input-validation-middleware");
exports.blogsRouter = (0, express_1.Router)({});
const ITINCUBATOR = (req, res, next) => {
    console.log("IT-INCUBATOR");
    next();
};
exports.blogsRouter.use(express_1.default.json());
exports.blogsRouter.use(ITINCUBATOR);
exports.blogsRouter.get("/", ITINCUBATOR, (req, res) => {
    const allBlogs = blogs_repository_1.blogsRepository.findAllBlogs();
    // res.send(allBlogs);
    res.status(200).send(allBlogs);
});
exports.blogsRouter.delete("/testing/all-data", (req, res) => {
    blogs_repository_1.blogsRepository.deleteAllBlogs();
    res.send(204);
});
function nameValidation(min, max) {
    return (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Name can't be empty")
        .isLength({ min: min, max: max })
        .withMessage("Name length must be between 3 and 15 characters");
}
exports.blogsRouter.post("/", [
    nameValidation(3, 15),
    (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("description can't be empty")
        .isLength({ min: 10, max: 500 })
        .withMessage("description length must be between 3 and 500 characters"),
], input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newBlog = blogs_repository_1.blogsRepository.addNewBlog(req.body);
    res.status(201).send(newBlog);
});
