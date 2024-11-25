"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titlePostValidation = titlePostValidation;
const express_validator_1 = require("express-validator");
function titlePostValidation() {
    return (0, express_validator_1.body)("title")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("title can't be empty")
        .isLength({ min: 1, max: 30 })
        .withMessage("title length must be between 1 and 30 characters");
}
