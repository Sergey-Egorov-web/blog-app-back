"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEmailValidation = userEmailValidation;
const express_validator_1 = require("express-validator");
function userEmailValidation() {
    return ((0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("email can't be empty")
        .isLength({ min: 6, max: 20 })
        .withMessage("email length must be between 3 and 10 characters")
        // .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        // .withMessage(
        //   "email must contain only letters, numbers, underscores, and hyphens"
        // );
        .isEmail()
        .withMessage("email must be a valid email address"));
}
