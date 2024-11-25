"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositories = exports.posts = void 0;
exports.posts = [
    {
        id: "1",
        title: "firstPost",
        shortDescription: "it is small description",
        content: "we will make a lot of content today and i the future",
        blogId: "1",
        blogName: "myBlog",
    },
    {
        id: "2",
        title: "firstPost",
        shortDescription: "it is small description",
        content: "we will make a lot of content today and i the future",
        blogId: "2",
        blogName: "denBlog",
    },
];
exports.postRepositories = {
    findAllPosts() {
        return exports.posts;
    },
};
