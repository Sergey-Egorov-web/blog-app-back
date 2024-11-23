"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthorizationMiddleware = void 0;
require("dotenv/config");
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const basicAuthorizationMiddleware = (req, res, next) => {
    //' Basic xxxx'
    //TODO убрать let, вынести в переменные
    // const data = `${username}:${password}`; // admin:qwerty
    const data = `${"admin"}:${"qwerty"}`;
    const base64data = Buffer.from(data).toString("base64"); //кодируем data в String base64
    const validAuthorizationValue = `Basic ${base64data}`;
    let authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader === validAuthorizationValue) {
        next();
    }
    else {
        res.status(401).send("Unauthorized");
    }
};
exports.basicAuthorizationMiddleware = basicAuthorizationMiddleware;
