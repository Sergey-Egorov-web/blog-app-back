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
exports.postRepositories = void 0;
const blogs_db_repository_1 = require("./blogs-db-repository");
const db_1 = require("./db");
// export let posts: PostDbType[] = [];
exports.postRepositories = {
    findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postCollection
                .find({})
                .toArray();
            if (result) {
                const resultWithoutMongoId = result.map((post) => ({
                    id: post.id,
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: post.blogName,
                    createdAt: post.createdAt,
                }));
                return resultWithoutMongoId;
            }
            else {
                return null;
            }
        });
    },
    findPost(id) {
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
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postCollection.deleteMany({});
            if (result.deletedCount > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postCollection.deleteOne({ id: id });
            if (result.deletedCount === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    addNewPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_db_repository_1.blogsRepository.findBlog(post.blogId);
            if (blog) {
                const newPost = {
                    id: Date.now().toString(),
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: blog.name,
                    createdAt: new Date().toISOString(),
                };
                yield db_1.postCollection.insertOne(newPost);
                const result = yield db_1.postCollection.findOne({
                    id: newPost.id,
                });
                if (result) {
                    const resultWithoutMongoId = {
                        id: result.id,
                        title: result.title,
                        shortDescription: result.shortDescription,
                        content: result.content,
                        blogId: result.blogId,
                        blogName: result.blogName,
                        createdAt: result.createdAt,
                    };
                    return resultWithoutMongoId;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        });
    },
    updatePostById(post, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const updatePost: PostOutputType | null =
            yield db_1.postCollection.updateOne({
                id: id,
            }, {
                $set: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    // blogId: post.blogId,
                },
            });
            const result = yield db_1.postCollection.findOne({
                id,
            });
            if (!result) {
                return null;
            }
            else {
                // updatePost.title = post.title;
                // updatePost.shortDescription = post.shortDescription;
                // updatePost.content = post.content;
                // updatePost.blogId = post.blogId;
                return result;
                // const blog: BlogDbType | null = await blogsRepository.findBlog(
                //   post.blogId
                // );
                // if (blog) {
                //   updatePost.blogName = blog.name;
                //   return updatePost;
                // } else {
                //   return null;
                // }
            }
        });
    },
};
