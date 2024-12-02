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
exports.blogsService = void 0;
const blogs_db_repository_1 = require("../repositories/blogs-db-repository");
exports.blogsService = {
    findAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            // return blogs;
            const result = yield blogs_db_repository_1.blogsRepository.findAllBlogs();
            if (result) {
                const resultWithoutMongoId = result.map((model) => ({
                    id: model.id,
                    name: model.name,
                    description: model.description,
                    websiteUrl: model.websiteUrl,
                    createdAt: model.createdAt,
                    isMembership: model.isMembership,
                }));
                return resultWithoutMongoId;
            }
            else {
                return null;
            }
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_db_repository_1.blogsRepository.findBlog(id);
            if (blog) {
                const resultWithoutMongoId = {
                    id: blog.id,
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                    createdAt: blog.createdAt,
                    isMembership: blog.isMembership,
                };
                return resultWithoutMongoId;
            }
            else {
                return null;
            }
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blogs_db_repository_1.blogsRepository.deleteAllBlogs();
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
            const result = yield blogs_db_repository_1.blogsRepository.deleteBlogById(id);
            if (result.deletedCount === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    addNewBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: Date.now().toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false,
            };
            yield blogs_db_repository_1.blogsRepository.addNewBlog(newBlog);
            // return newBlog;
            const result = yield blogCollection.findOne({
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
    updateBlogById(blog, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blogCollection.updateOne({ id: id }, {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                },
            });
            let updateBlog = yield blogCollection.findOne({ id });
            if (updateBlog) {
                return updateBlog;
            }
            else {
                return null;
            }
        });
    },
};
