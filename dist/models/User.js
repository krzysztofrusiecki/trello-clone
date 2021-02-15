"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: true,
        min: 7,
        max: 255,
    },
    lastname: {
        type: String,
        required: true,
        min: 7,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 7,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 7,
        max: 255,
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.model('User', userSchema);
//# sourceMappingURL=User.js.map