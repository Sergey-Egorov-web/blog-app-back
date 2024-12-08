"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEmailValidation = userEmailValidation;
const express_validator_1 = require("express-validator");
function userEmailValidation() {
    return (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("password can't be empty")
        .isLength({ min: 6, max: 20 })
        .withMessage("password length must be between 3 and 10 characters")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .withMessage("password must contain only letters, numbers, underscores, and hyphens");
}
