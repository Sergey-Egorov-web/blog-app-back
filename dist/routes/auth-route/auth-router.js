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
exports.authRouter.post("/login", (0, user_login_or_email_validation_1.userLoginOrEmailValidation)(), (0, user_password_validation_1.userPasswordValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInputData = req.body;
        // console.log("authRouter/login1", loginInputData);
        const user = yield users_service_1.usersService.checkUser(loginInputData);
        // console.log("authRouter/login2", user);
        if (!user) {
            res.sendStatus(401);
            return;
        }
        if ("id" in user) {
            //
            const accessToken = yield jwtService_1.jwtService.createAccessTokenJWT(user.id);
            //
            // console.log("authRouter/login3", accessToken);
            const refreshToken = yield jwtService_1.jwtService.createRefreshTokenJWT(user.id);
            // console.log("authRouter/login4", refreshToken);
            //
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
            });
            res.status(200).send({ accessToken: accessToken });
        }
        else {
            res.status(401).json(user);
        }
    }
    catch (error) {
        res.json(error);
    }
}));
exports.authRouter.post("/logout", 
// basicAuthorizationMiddleware,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.sendStatus(401);
        return;
    }
    const checkRefreshToken = yield jwtService_1.jwtService.checkRefreshTokenIntoBlacklist(refreshToken);
    if (checkRefreshToken === true) {
        res.sendStatus(401);
        return;
    }
    const decoded = yield jwtService_1.jwtService.verifyRefreshToken(refreshToken);
    console.log("authRouter-logout1", decoded);
    if (decoded == null) {
        // res.sendStatus(401).json({ message: "Invalid or expired refresh token" });
        res.sendStatus(401);
        return;
    }
    const userId = yield jwtService_1.jwtService.getUserIdByRefreshToken(refreshToken);
    if (userId) {
        const result = yield jwtService_1.jwtService.addRefreshTokenToBlacklist(refreshToken);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(401);
    }
}));
exports.authRouter.post("/refresh-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("/refresh-token", req.cookies.refreshToken);
    const refreshToken = req.cookies.refreshToken;
    // console.log("authRouter/refresh-token1", refreshToken);
    const checkRefreshToken = yield jwtService_1.jwtService.checkRefreshTokenIntoBlacklist(refreshToken);
    // console.log("authRouter/refresh-token2", checkRefreshToken);
    if (checkRefreshToken === true) {
        res.sendStatus(401);
        return;
    }
    const decoded = yield jwtService_1.jwtService.verifyRefreshToken(refreshToken);
    console.log("authRouter-refresh-token2", decoded);
    if (decoded == null) {
        // res.status(401).json({ message: "Invalid or expired refresh token" });
        res.sendStatus(401);
        return;
    }
    const userId = yield jwtService_1.jwtService.getUserIdByRefreshToken(refreshToken);
    // console.log("/refresh-token", userId);
    // console.log("authRouter/refresh-token3", userId);
    if (!userId) {
        res.status(401).json({ message: "Refresh token is missing" });
        return;
        // res.sendStatus(401);
    }
    //
    const newAccessToken = yield jwtService_1.jwtService.createAccessTokenJWT(userId);
    //
    // console.log("authRouter/refresh-token4", newAccessToken);
    const newRefreshToken = yield jwtService_1.jwtService.createRefreshTokenJWT(userId);
    //
    // console.log("authRouter/refresh-token5", newRefreshToken);
    const result = yield jwtService_1.jwtService.addRefreshTokenToBlacklist(refreshToken);
    // console.log("authRouter/refresh-token6", result);
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
    });
    res.status(200).send({ accessToken: newAccessToken });
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
        // console.log(user);
        // Если это ошибка, возвращаем статус 400 и тело ошибки
        res.status(400).json(user);
        return;
    }
    else {
        // Если пользователь успешно создан, возвращаем статус 201 и данные пользователя
        res.sendStatus(204);
        return;
    }
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
