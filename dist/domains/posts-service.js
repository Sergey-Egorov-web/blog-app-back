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
const blog_db_query_repository_1 = require("../repositories/blog-db-query-repository");
const posts_db_repository_1 = require("../repositories/posts-db-repository");
// import { postCollection } from "./db";
// export let posts: PostDbType[] = [];
exports.postService = {
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield posts_db_repository_1.postRepository.deleteAllPosts();
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
            const result = yield posts_db_repository_1.postRepository.deletePostById(id);
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
            const blog = yield blog_db_query_repository_1.blogsQueryRepository.findBlogById(post.blogId);
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
                const result = yield posts_db_repository_1.postRepository.addNewPost(newPost);
                if (result) {
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
            const result = yield posts_db_repository_1.postRepository.updatePostById(id, post);
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
