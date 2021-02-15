"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = require("../controllers/Users");
const router = express_1.Router();
router.post('/login', Users_1.login);
router.post('/register', Users_1.register);
router.get('/user', Users_1.getUser);
exports.default = router;
//# sourceMappingURL=auth.js.map