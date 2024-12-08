"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = userLoginValidation;
const express_validator_1 = require("express-validator");
function userLoginValidation() {
    return (0, express_validator_1.body)("login")
        .trim()
        .notEmpty()
        .withMessage("name can't be empty")
        .isLength({ min: 3, max: 10 })
        .withMessage("name length must be between 3 and 10 characters")
        .matches(/^[a-zA-Z0-9_-]*$/)
        .withMessage("Login must contain only letters, numbers, underscores, and hyphens");
}
