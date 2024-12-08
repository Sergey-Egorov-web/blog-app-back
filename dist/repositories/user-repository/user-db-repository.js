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
const db_1 = require("../db");
exports.usersRepository = {
    addNewUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.userCollection.insertOne(newUser);
            const result = yield db_1.userCollection.findOne({
                id: newUser.id,
            });
            if (result) {
                //     const resultWithoutMongoId: BlogOutputType = {
                //       id: result.id,
                //       name: result.name,
                //       description: result.description,
                //       websiteUrl: result.websiteUrl,
                //       createdAt: result.createdAt,
                //       isMembership: result.isMembership,
                //     };
                return result.id;
            }
            else {
                return null;
            }
        });
    },
};
