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
exports.postRepository = void 0;
const db_1 = require("./db");
exports.postRepository = {
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
    // async deleteAllComments(): Promise<boolean> {
    //   const result = await commentCollection.deleteMany({});
    //   if (result.deletedCount > 0) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
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
    addNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postCollection.insertOne(newPost);
            // console.log(newPost.id);
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
            // } else {
            //   return null;
            // }
        });
    },
    updatePostById(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            // const updatePost: PostOutputType | null =
            yield db_1.postCollection.updateOne({
                id: id,
            }, {
                $set: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                },
            });
            const result = yield db_1.postCollection.findOne({
                id,
            });
            if (!result) {
                return null;
            }
            else {
                return result;
            }
        });
    },
    addNewComment(newComment
    // postId: string
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.commentCollection.insertOne(newComment);
            const result = yield db_1.commentCollection.findOne({
                id: newComment.id,
            });
            if (result) {
                const resultWithoutMongoId = {
                    id: result.id,
                    content: result.content,
                    commentatorInfo: result.commentatorInfo,
                    createdAt: result.createdAt,
                };
                console.log("post-db-repository", resultWithoutMongoId);
                return resultWithoutMongoId;
            }
            else {
                return null;
            }
            // } else {
            //   return null;
            // }
        });
    },
};
