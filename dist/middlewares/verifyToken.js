"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, _res, next) => {
    var _a;
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, (_a = process.env.TOKEN_SECRET) !== null && _a !== void 0 ? _a : '');
    }
    catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req._id = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id;
    next();
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map