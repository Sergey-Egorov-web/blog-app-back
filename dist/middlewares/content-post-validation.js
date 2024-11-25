"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentPostValidation = contentPostValidation;
const express_validator_1 = require("express-validator");
function contentPostValidation() {
    return (0, express_validator_1.body)("content")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("content can't be empty")
        .isLength({ min: 30, max: 1000 })
        .withMessage("content length must be between 30 and 1000 characters");
}
