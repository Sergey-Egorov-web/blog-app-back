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
exports.usersService = void 0;
// import { password } from "../configuration";
const user_db_repository_1 = require("../repositories/user-repository/user-db-repository");
exports.usersService = {
    addNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // const user: UserDbType | null = await {
            if (user) {
                const newUser = {
                    id: Date.now().toString(),
                    login: user.login,
                    password: user.password,
                    email: user.email,
                    createdAt: new Date().toISOString(),
                };
                const result = yield user_db_repository_1.usersRepository.addNewUser(newUser);
                if (result) {
                    return result;
                }
                //   else {
                //     return null;
                //   }
            }
            return null;
        });
    },
};
