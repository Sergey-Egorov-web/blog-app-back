"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortDescriptionPostValidation = shortDescriptionPostValidation;
const express_validator_1 = require("express-validator");
function shortDescriptionPostValidation() {
    return (0, express_validator_1.body)("shortDescription")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("shortDescription can't be empty")
        .isLength({ min: 5, max: 30 })
        .withMessage("shortDescription length must be between 5 and 100 characters");
}
