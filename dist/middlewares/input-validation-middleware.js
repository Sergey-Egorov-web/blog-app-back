"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    let errors = result.array({ onlyFirstError: true });
    const errorsMessages = errors.map((model) => ({
        message: model.msg,
        field: model.path,
    }));
    if (!result.isEmpty()) {
        res.status(400).send({ errorsMessages });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
