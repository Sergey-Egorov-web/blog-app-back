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
exports.postQueryRepository = void 0;
const db_1 = require("./db");
exports.postQueryRepository = {
    findAllPosts(pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            const foundPosts = yield db_1.postCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            // console.log(foundPosts);
            // console.log()
            const totalCount = (yield db_1.postCollection.find().toArray()).length;
            const page = pageNumber;
            const pagesCount = Math.ceil(totalCount / pageSize);
            if (foundPosts) {
                const resultWithoutMongoId = foundPosts.map((post) => ({
                    id: post.id,
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: post.blogName,
                    createdAt: post.createdAt,
                }));
                const result = {
                    pagesCount: pagesCount,
                    page: page,
                    pageSize: pageSize,
                    totalCount: totalCount,
                    items: resultWithoutMongoId,
                };
                return result;
            }
            else {
                return null;
            }
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postCollection.findOne({ id });
            if (post) {
                const resultWithoutMongoId = {
                    id: post.id,
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: post.blogName,
                    createdAt: post.createdAt,
                };
                return resultWithoutMongoId;
            }
            else {
                return null;
            }
        });
    },
};
