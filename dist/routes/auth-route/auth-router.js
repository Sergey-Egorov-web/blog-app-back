"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const basic_authorization_middleware_1 = require("../../middlewares/basic-authorization-middleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post("/:login", basic_authorization_middleware_1.basicAuthorizationMiddleware);
