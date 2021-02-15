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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            throw Error('There is no user with this email in our system');
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw Error('Wrong email or password');
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, (_a = process.env.TOKEN_SECRET) !== null && _a !== void 0 ? _a : '', {
            expiresIn: '1h',
        });
        if (!token)
            throw Error('Could not sign the token');
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error.message,
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { firstname, lastname, email, password } = req.body;
    try {
        const userInDB = yield User_1.default.findOne({ email });
        if (userInDB) {
            throw Error('User with this email already exists');
        }
        const user = new User_1.default({
            email,
            password,
            firstname,
            lastname,
        });
        user.password = yield bcrypt_1.default.hash(user.password, 10);
        const newUser = yield user.save();
        const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, (_b = process.env.TOKEN_SECRET) !== null && _b !== void 0 ? _b : '', {
            expiresIn: '1h',
        });
        return res.status(200).json({
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error.message,
        });
    }
});
exports.register = register;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req._id)
        return res.status(400).json({ error: 'No user was logged in' });
    try {
        const user = yield User_1.default.findOne({ _id: req._id });
        if (!user)
            throw Error('User does not exist');
        return res.status(200).json({
            id: user._id,
            email: user.email,
        });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.getUser = getUser;
//# sourceMappingURL=Users.js.map