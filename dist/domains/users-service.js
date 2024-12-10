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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const user_db_repository_1 = require("../repositories/user-repository/user-db-repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
// const bcrypt = require('bcrypt');
exports.usersService = {
    addNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorsMessages = [];
            let errorCount = 0;
            if (user.email === "") {
                errorsMessages.push({ field: "email", message: "email cant be empty" });
                errorCount++;
            }
            if (user.login === "") {
                errorsMessages.push({ field: "login", message: "login cant be empty" });
                errorCount++;
            }
            if (user.password === "") {
                errorsMessages.push({
                    field: "password",
                    message: "password cant be empty",
                });
                errorCount++;
            }
            if (errorsMessages.length) {
                return { errorsMessages };
            }
            else {
                const hash = yield getHash(user.password);
                const newUser = {
                    id: Date.now().toString(),
                    login: user.login,
                    password: hash,
                    email: user.email,
                    createdAt: new Date().toISOString(),
                };
                console.log(newUser.password);
                const result = yield user_db_repository_1.usersRepository.addNewUser(newUser);
                if (result) {
                    return result;
                }
                else {
                    return {
                        errorsMessages: [{ field: "server", message: "Failed to add user" }],
                    };
                }
            }
        });
    },
};
function getHash(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        return hashedPassword;
    });
}
