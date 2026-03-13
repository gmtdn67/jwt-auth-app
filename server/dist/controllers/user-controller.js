"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const user_service_1 = __importDefault(require("../service/user-service"));
const api_error_1 = __importDefault(require("../exceptions/api-error"));
class UserController {
    async registration(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return next(api_error_1.default.BadRequest('Ошибка валидации', errors.array()));
            }
            const { email, password } = req.body;
            const userData = await user_service_1.default.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await user_service_1.default.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await user_service_1.default.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }
        catch (error) {
            next(error);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await user_service_1.default.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await user_service_1.default.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }
    async getUsers(_req, res, next) {
        try {
            const users = await user_service_1.default.getAllUsers();
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map