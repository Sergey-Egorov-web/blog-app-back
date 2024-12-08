"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPasswordValidation = userPasswordValidation;
const express_validator_1 = require("express-validator");
function userPasswordValidation() {
    return (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("password can't be empty")
        .isLength({ min: 6, max: 20 })
        .withMessage("password length must be between 3 and 10 characters");
}
