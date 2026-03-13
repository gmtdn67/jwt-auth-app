"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./router/index"));
const error_middleware_1 = __importDefault(require("./middlewares/error-middleware"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
// Подключение middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use('/api', index_1.default);
app.use(error_middleware_1.default);
const start = async () => {
    try {
        if (!process.env.DB_URL) {
            throw new Error('DB_URL is not defined in environment variables');
        }
        await mongoose_1.default.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=index.js.map