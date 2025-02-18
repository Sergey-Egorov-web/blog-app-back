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
exports.blogsRepository = void 0;
const db_1 = require("./db");
exports.blogsRepository = {
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogCollection.deleteMany({});
            if (result.deletedCount > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogCollection.deleteOne({ id });
            if (result.deletedCount === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    addNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.blogCollection.insertOne(newBlog);
            // return newBlog;
            const result = yield db_1.blogCollection.findOne({
                id: newBlog.id,
            });
            if (result) {
                const resultWithoutMongoId = {
                    id: result.id,
                    name: result.name,
                    description: result.description,
                    websiteUrl: result.websiteUrl,
                    createdAt: result.createdAt,
                    isMembership: result.isMembership,
                };
                return resultWithoutMongoId;
            }
            else {
                return null;
            }
        });
    },
    updateBlogById(id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogCollection.updateOne({ id: id }, {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                },
            });
            let updateBlog = yield db_1.blogCollection.findOne({ id });
            if (updateBlog) {
                return updateBlog;
            }
            else {
                return null;
            }
        });
    },
};
