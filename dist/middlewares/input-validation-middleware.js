"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSiteUrlValidation = exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res
            .status(400)
            .send({ codeResult: 1, errors: result.array({ onlyFirstError: true }) });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
const webSiteUrlValidation = (req, res, next) => {
    (0, express_validator_1.body)("websiteUrl")
        .trim()
        .notEmpty()
        .withMessage("websiteUrl can't be empty")
        .isURL()
        .withMessage("field url must be Url")
        .isLength({ min: 3, max: 100 })
        .withMessage("websiteUrl length must be between 3 and 100 characters");
    next();
};
exports.webSiteUrlValidation = webSiteUrlValidation;
