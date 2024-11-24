"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidation = nameValidation;
const express_validator_1 = require("express-validator");
function nameValidation() {
    return (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("name can't be empty")
        .isLength({ min: 3, max: 15 })
        .withMessage("name length must be between 3 and 15 characters");
}
