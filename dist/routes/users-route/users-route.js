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
const users_service_1 = require("../../domains/users-services/users-service");
const user_db_query_repository_1 = require("../../repositories/user-repository/user-db-query-repository");
const user_password_validation_1 = require("../../middlewares/user-validation/user-password-validation");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.post("/", basic_authorization_middleware_1.basicAuthorizationMiddleware, (0, user_login_validation_1.userLoginValidation)(), (0, user_password_validation_1.userPasswordValidation)(), (0, user_email_validation_1.userEmailValidation)(), input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreateData = req.body;
    const newUser = yield users_service_1.usersService.addNewUser(userCreateData);
    if (newUser) {
        res.status(201).send(newUser);
    }
    else {
        res.status(400).send(newUser);
    }
}));
exports.usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchLoginTerm = req.query.searchLoginTerm
        ? req.query.searchLoginTerm.toString()
        : null;
    const searchEmailTerm = req.query.searchEmailTerm
        ? req.query.searchEmailTerm.toString()
        : null;
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : "createdAt";
    const sortDirection = req.query.sortDirection && req.query.sortDirection.toString() === "asc"
        ? "asc"
        : "desc";
    const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const allUsers = yield user_db_query_repository_1.usersQueryRepository.findAllUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm);
    res.status(200).send(allUsers);
}));
exports.usersRouter.delete("/:id", basic_authorization_middleware_1.basicAuthorizationMiddleware, 
// checkBlogExistsMiddleware,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const answer = yield users_service_1.usersService.deleteUserById(id);
    // console.log(answer);
    if (answer === true) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
