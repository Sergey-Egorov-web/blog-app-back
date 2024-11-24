"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSiteUrlValidation = void 0;
const express_validator_1 = require("express-validator");
const webSiteUrlValidation = () => {
    return (0, express_validator_1.body)("websiteUrl")
        .trim()
        .notEmpty()
        .withMessage("websiteUrl can't be empty")
        .isURL()
        .withMessage("field url must be Url")
        .isLength({ min: 3, max: 100 })
        .withMessage("websiteUrl length must be between 3 and 100 characters");
};
exports.webSiteUrlValidation = webSiteUrlValidation;
