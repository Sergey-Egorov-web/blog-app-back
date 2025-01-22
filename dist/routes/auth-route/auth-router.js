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
const jwt_authorization_middleware_1 = require("../../middlewares/jwt-authorization-middleware");
const auth_service_1 = require("../../domains/auth-service");
const user_email_validation_1 = require("../../middlewares/user-validation/user-email-validation");
const user_login_validation_1 = require("../../middlewares/user-validation/user-login-validation");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post("/login", 
// basicAuthorizationMiddleware,
(0, user_login_or_email_validation_1.userLoginOrEmailValidation)(), (0, user_password_validation_1.userPasswordValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputData = req.body;
    // const passwordInputData: string = req.body.password;
    const user = yield users_service_1.usersService.checkUser(loginInputData);
    if ("id" in user) {
        //
        const token = yield jwtService_1.jwtService.createJWT(user);
        //
        res.status(200).send({ accessToken: token });
    }
    else {
        res.status(401).json(user);
    }
}));
exports.authRouter.get("/me", jwt_authorization_middleware_1.jwtAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.userId) {
        const user = yield user_db_query_repository_1.usersQueryRepository.findUserById(req.userId);
        res.status(200).send(user);
    }
}));
exports.authRouter.post("/registration", (0, user_login_validation_1.userLoginValidation)(), (0, user_email_validation_1.userEmailValidation)(), (0, user_password_validation_1.userPasswordValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserInputData = req.body;
    const user = yield auth_service_1.authService.createUser(UserInputData.login, UserInputData.email, UserInputData.password);
    // Проверка, является ли результат ошибкой
    if ("errorsMessages" in user) {
        // Если это ошибка, возвращаем статус 400 и тело ошибки
        res.status(400).json(user);
    }
    // Если пользователь успешно создан, возвращаем статус 201 и данные пользователя
    res.sendStatus(204);
}));
exports.authRouter.post("/registration-confirmation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    const result = yield auth_service_1.authService.confirmEmail(code);
    // Проверка, является ли результат ошибкой
    if (typeof result === "object" && "errorsMessages" in result) {
        // console.log(result);
        // Если это ошибка, возвращаем статус 400 и тело ошибки
        res.status(400).json(result);
    }
    else {
        // Если пользователь успешно создан, возвращаем статус 201 и данные пользователя
        res.sendStatus(204);
    }
}));
exports.authRouter.post("/registration-email-resending", (0, user_email_validation_1.userEmailValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield auth_service_1.authService.resendEmail(email);
    if ("errorsMessages" in user) {
        // Если это ошибка, возвращаем статус 400 и тело ошибки
        res.status(400).json(user);
    }
    // Если пользователь успешно создан, возвращаем статус 201 и данные пользователя
    res.sendStatus(204);
}));
