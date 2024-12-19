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
const jwtService_1 = require("../../application/jwtService");
const user_db_query_repository_1 = require("../../repositories/user-repository/user-db-query-repository");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post("/:login", 
// basicAuthorizationMiddleware,
(0, user_login_or_email_validation_1.userLoginOrEmailValidation)(), (0, user_password_validation_1.userPasswordValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputData = req.body;
    const user = yield users_service_1.usersService.checkUser(loginInputData);
    if ("id" in user) {
        // console.log("Success");
        const token = yield jwtService_1.jwtService.createJWT(user);
        res.status(200).send(token);
    }
    else {
        res.status(401).json(user);
    }
}));
exports.authRouter.get("/:me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const loginInputData: LoginInputModel = req.body;
    // Middleware для проверки токена
    // const authHeader = req.headers['authorization'];
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            if (token) {
                const userId = yield jwtService_1.jwtService.getUserIdByToken(token);
                console.log('authRouter.get("/:me"', userId);
                const user = yield user_db_query_repository_1.usersQueryRepository.findUserById(userId);
                // console.log(user);
                res.status(200).send(user);
            }
            else {
                res.sendStatus(401);
            }
        }
        catch (error) {
            console.error("Error while processing token:", error);
        }
    }
    // if ("id" in user) {
    //   // console.log("Success");
    //   const token = await jwtService.createJWT(user);
    //   res.status(200).send(token);
    // } else {
    //   res.status(401).json(user);
    // }
}));
