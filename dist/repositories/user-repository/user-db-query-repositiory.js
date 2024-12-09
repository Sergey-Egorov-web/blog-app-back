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
exports.usersQueryRepository = void 0;
const db_1 = require("../db");
exports.usersQueryRepository = {
    findAllUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (searchLoginTerm) {
                filter.login = { $regex: searchLoginTerm, $options: "i" };
            }
            if (searchEmailTerm) {
                filter.email = { $regex: searchEmailTerm, $options: "i" };
            }
            const foundUsers = yield db_1.userCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            const totalCount = (yield db_1.userCollection.find(filter).toArray()).length;
            const page = pageNumber;
            const pagesCount = Math.ceil(totalCount / pageSize);
            const resultWithoutMongoId = foundUsers.map((user) => ({
                id: user.id,
                login: user.login,
                email: user.email,
                createdAt: user.createdAt,
            }));
            const result = {
                pagesCount: pagesCount,
                page: page,
                pageSize: pageSize,
                totalCount: totalCount,
                items: resultWithoutMongoId,
            };
            return result;
        });
    },
};
