"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptionValidation = void 0;
const express_validator_1 = require("express-validator");
const descriptionValidation = () => {
    return (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("description can't be empty")
        .isLength({ min: 10, max: 500 })
        .withMessage("description length must be between 10 and 500 characters");
};
exports.descriptionValidation = descriptionValidation;
