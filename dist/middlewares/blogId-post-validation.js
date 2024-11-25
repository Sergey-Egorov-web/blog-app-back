"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogIdPostValidation = blogIdPostValidation;
const express_validator_1 = require("express-validator");
function blogIdPostValidation() {
    return (0, express_validator_1.body)("blogId")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("blogId can't be empty");
}
