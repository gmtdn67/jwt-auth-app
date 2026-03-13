"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const token_service_1 = __importDefault(require("../service/token-service"));
function default_1(req, _res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(api_error_1.default.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(api_error_1.default.UnauthorizedError());
        }
        const userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(api_error_1.default.UnauthorizedError());
        }
        req.user = userData;
        next();
    }
    catch (error) {
        return next(api_error_1.default.UnauthorizedError());
    }
}
//# sourceMappingURL=auth-middleware.js.map