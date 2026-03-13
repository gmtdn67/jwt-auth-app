"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const api_error_1 = __importDefault(require("../exceptions/api-error"));
function default_1(err, _req, res, _next) {
    console.log(err);
    if (err instanceof api_error_1.default) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
    }
    return res.status(500).json({
        message: 'Непредвиденная ошибка',
    });
}
//# sourceMappingURL=error-middleware.js.map