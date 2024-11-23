"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthorizationMiddleware = void 0;
// import basicAuth from "basic-auth";
const basicAuthorizationMiddleware = (req, res, next) => {
    //' Basic xxxx'
    let data = `${"admin123"}:${"qwerty"}`; // admin:qwerty
    let base64data = Buffer.from(data).toString("base64"); //кодируем data в String base64
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
//   const user = basicAuth(req);
//   if (!user || user.name !== "your-username" || user.pass !== "your-password") {
//     res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
//     return res.status(401).send("Unauthorized");
//   }
//   next();
// };
