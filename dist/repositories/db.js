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
exports.commentCollection = exports.userCollection = exports.blogCollection = exports.postCollection = void 0;
exports.runDB = runDB;
const mongodb_1 = require("mongodb");
require("dotenv/config");
const mongoUri = process.env.MONGO_URL;
// || "mongodb://0.0.0.0:27017/BloggerPlatform";
if (!mongoUri) {
    throw new Error("MongoDB connection string is not defined");
}
const client = new mongodb_1.MongoClient(mongoUri);
exports.postCollection = client
    .db("BloggerPlatform")
    .collection("posts");
exports.blogCollection = client
    .db("BloggerPlatform")
    .collection("blogs");
exports.userCollection = client
    .db("BloggerPlatform")
    .collection("users");
exports.commentCollection = client
    .db("BloggerPlatform")
    .collection("comments");
function runDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.db("BloggerPlatform").command({ ping: 1 });
        }
        catch (_a) {
            yield client.close();
        }
    });
}
// connectToDatabase();
