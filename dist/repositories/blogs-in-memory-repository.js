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
exports.blogsRepository = exports.blogs = void 0;
exports.blogs = [
    {
        id: "1",
        name: "myBlog",
        description: "blog about me",
        websiteUrl: "aboutme@yandex.ru",
    },
    {
        id: "2",
        name: "denBlog",
        description: "blog about Den",
        websiteUrl: "den@yandex.ru",
    },
];
exports.blogsRepository = {
    findAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.blogs;
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = exports.blogs.find((p) => p.id === id);
            if (blog) {
                return blog;
            }
            else {
                return null;
            }
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            exports.blogs = [];
            return exports.blogs;
        });
    },
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < exports.blogs.length; i++) {
                if (exports.blogs[i].id === id) {
                    exports.blogs.splice(i, 1);
                    return true;
                }
            }
            // console.log(false);
            return false;
        });
    },
    addNewBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: Date.now().toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
            };
            // console.log(typeof newBlog.id);
            // console.log(newBlog.id);
            exports.blogs.push(newBlog);
            return newBlog;
        });
    },
    updateBlogById(blog, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateBlog = exports.blogs.find((p) => p.id === id);
            if (updateBlog) {
                updateBlog.name = blog.name;
                updateBlog.description = blog.description;
                updateBlog.websiteUrl = blog.websiteUrl;
                return updateBlog;
            }
            else {
                return null;
            }
        });
    },
};
