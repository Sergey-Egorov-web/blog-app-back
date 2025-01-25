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
exports.usersRepository = void 0;
const date_fns_1 = require("date-fns");
const db_1 = require("../db");
exports.usersRepository = {
    addNewUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.userCollection.insertOne(newUser);
            const result = yield db_1.userCollection.findOne({
                id: newUser.id,
            });
            console.log("user-db-repository", result);
            if (result) {
                const resultWithoutMongoId = {
                    id: result.id,
                    login: result.login,
                    email: result.email,
                    createdAt: result.createdAt,
                };
                return resultWithoutMongoId;
            }
            else {
                return null;
            }
        });
    },
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUsers = yield db_1.userCollection.find().toArray();
            const resultWithoutMongoId = foundUsers.map((user) => ({
                id: user.id,
                login: user.login,
                email: user.email,
                createdAt: user.createdAt,
            }));
            return resultWithoutMongoId;
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.userCollection.deleteOne({ id });
            if (result.deletedCount === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.userCollection.deleteMany({});
            if (result.deletedCount > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    updateConfirmation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.userCollection.updateOne({ id }, { $set: { "emailConfirmation.isConfirmed": true } });
            // Проверяем, был ли документ обновлён
            if (result.modifiedCount === 1) {
                const user = yield db_1.userCollection.findOne({ id });
                return true; // Успешное обновление
            }
            else {
                return false; // Документ не был обновлён
            }
        });
    },
    updateConfirmationDate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newExpirationDate = (0, date_fns_1.add)(new Date(), { hours: 1, minutes: 3 });
            const result = yield db_1.userCollection.updateOne({ id }, { $set: { "emailConfirmation.expirationDate": newExpirationDate } });
            return result.modifiedCount === 1;
        });
    },
};
