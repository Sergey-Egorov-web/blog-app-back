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
exports.blogsQueryRepository = void 0;
const db_1 = require("./db");
exports.blogsQueryRepository = {
    findAllBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (searchNameTerm) {
                filter.name = { $regex: searchNameTerm, $options: "i" };
            }
            //
            const foundBlogs = yield db_1.blogCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            const totalCount = (yield db_1.blogCollection.find(filter).toArray()).length;
            const page = pageNumber;
            const pagesCount = Math.ceil(totalCount / pageSize);
            const resultWithoutMongoId = foundBlogs.map((blog) => ({
                id: blog.id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership,
            }));
            //
            const result = {
                pagesCount: pagesCount,
                page: page,
                pageSize: pageSize,
                totalCount: totalCount,
                items: resultWithoutMongoId,
            };
            //
            return result;
            // return result;
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ id });
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
    findAllPostsByBlogId(blogId, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            // const result: PostOutputType[] = [];
            const foundPosts = yield db_1.postCollection
                .find({ blogId })
                .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            //
            const resultWithoutMongoId = foundPosts.map((model) => ({
                id: model.id,
                title: model.title,
                shortDescription: model.shortDescription,
                content: model.content,
                blogId: model.blogId,
                blogName: model.blogName,
                createdAt: model.createdAt,
            }));
            //
            const totalCount = (yield db_1.postCollection.find({ blogId }).toArray()).length;
            const page = pageNumber;
            const pagesCount = Math.ceil(totalCount / pageSize);
            const result = {
                pagesCount: pagesCount,
                page: page,
                pageSize: pageSize,
                totalCount: totalCount,
                items: resultWithoutMongoId,
            };
            if (result) {
                return result;
            }
            else {
                return null;
            }
        });
    },
};
