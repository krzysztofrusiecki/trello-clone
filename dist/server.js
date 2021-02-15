"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyToken_1 = __importDefault(require("./middlewares/verifyToken"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = express_1.default();
const PORT = 4000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(verifyToken_1.default);
app.use('/auth', auth_1.default);
mongoose_1.default.connect((_a = process.env.DB_DEV) !== null && _a !== void 0 ? _a : '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => console.log('Connected to DB'));
app.listen(PORT, () => console.log('Running on port 4000'));
//# sourceMappingURL=server.js.map