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
exports.blogIdUriParamPostValidation = void 0;
const express_validator_1 = require("express-validator");
const blog_db_query_repository_1 = require("../repositories/blog-db-query-repository");
const blogIdUriParamPostValidation = (
// export function blogIdUriParamPostValidation(
req, res, next) => {
    return (0, express_validator_1.param)("blogId")
        .trim()
        .isString()
        .withMessage("blogId must be string")
        .notEmpty()
        .withMessage("blogId can't be empty")
        .custom((id) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield blog_db_query_repository_1.blogsQueryRepository.findBlogById(id);
        if (!blog) {
            // throw new Error("Blog not found");
            res.status(404).send("Not Found");
        }
        else {
            next();
        }
    }));
    //   return true;
    // })
    // .withMessage("Blog not found");
};
exports.blogIdUriParamPostValidation = blogIdUriParamPostValidation;
