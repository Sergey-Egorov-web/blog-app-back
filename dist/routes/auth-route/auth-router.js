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
exports.authRouter = void 0;
const express_1 = require("express");
const users_service_1 = require("../../domains/users-services/users-service");
const user_password_validation_1 = require("../../middlewares/user-validation/user-password-validation");
const user_login_or_email_validation_1 = require("../../middlewares/user-validation/user-login-or-email-validation");
const input_validation_middleware_1 = require("../../middlewares/input-validation-middleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post("/:login", 
// basicAuthorizationMiddleware,
(0, user_login_or_email_validation_1.userLoginOrEmailValidation)(), (0, user_password_validation_1.userPasswordValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputData = req.body;
    const check = yield users_service_1.usersService.checkUser(loginInputData);
    if (check === true) {
        console.log("Success");
        res.sendStatus(204);
    }
    else {
        res.status(401).json(check);
    }
}));
