"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const basic_authorization_middleware_1 = require("../../middlewares/basic-authorization-middleware");
const user_login_validation_1 = require("../../middlewares/user-validation/user-login-validation");
const user_email_validation_1 = require("../../middlewares/user-validation/user-email-validation");
const input_validation_middleware_1 = require("../../middlewares/input-validation-middleware");
const users_service_1 = require("../../domains/users-service");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.post("/", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, user_login_validation_1.userLoginValidation)(), (0, user_login_validation_1.userLoginValidation)(), (0, user_email_validation_1.userEmailValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreateData = req.body;
    const newUser = yield users_service_1.usersService.addNewUser(userCreateData);
    if (newUser) {
        res.status(201).send(newUser);
    }
    // else {
    //   res.status(404).send("Blog not found");
    // }
}));
