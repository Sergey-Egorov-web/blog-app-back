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
exports.postService = void 0;
const posts_db_repository_1 = require("../repositories/posts-db-repository");
// import { BlogDbType, blogsRepository } from "./blogs-db-repository";
const blogs_service_1 = require("./blogs-service");
// import { postCollection } from "./db";
// export let posts: PostDbType[] = [];
exports.postService = {
    findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield posts_db_repository_1.postRepositories.findAllPosts();
            if (result) {
                return result;
            }
            else {
                return null;
            }
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield posts_db_repository_1.postRepositories.findPostById(id);
            if (post) {
                return post;
            }
            else {
                return null;
            }
        });
    },
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield posts_db_repository_1.postRepositories.deleteAllPosts();
            if (result === true) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield posts_db_repository_1.postRepositories.deletePostById(id);
            if (result === true) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    addNewPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_service_1.blogsService.findBlogById(post.blogId);
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
                const result = yield posts_db_repository_1.postRepositories.addNewPost(newPost);
                //   const result = await postService.findPostById(newPost.id);
                if (result) {
                    //     const resultWithoutMongoId: PostOutputType = {
                    //       id: result.id,
                    //       title: result.title,
                    //       shortDescription: result.shortDescription,
                    //       content: result.content,
                    //       blogId: result.blogId,
                    //       blogName: result.blogName,
                    //       createdAt: result.createdAt,
                    //     };
                    return result;
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
    updatePostById(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            // const updatePost: PostOutputType | null =
            const result = yield posts_db_repository_1.postRepositories.updatePostById(id, post);
            // const result = await postCollection.findOne({
            //   id,
            // });
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
