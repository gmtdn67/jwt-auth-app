"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user-model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const mail_service_1 = __importDefault(require("./mail-service"));
const token_service_1 = __importDefault(require("./token-service"));
const user_dto_1 = require("../dtos/user-dto");
const api_error_1 = __importDefault(require("../exceptions/api-error"));
class UserService {
    async registration(email, password) {
        const candidate = await user_model_1.default.findOne({ email });
        // Проверка на наличии в БД пользователя с заданным email
        if (candidate) {
            throw api_error_1.default.BadRequest(`Пользователь с таким почтовым адресом существует`, []);
        }
        // Хэшируем пароль и создаем динамическую часть ссылки для активации
        const hashPassword = await bcrypt_1.default.hash(password, 3);
        const activationLink = (0, uuid_1.v4)();
        // Сохраняем пользователя в БД
        const user = await user_model_1.default.create({ email, password: hashPassword, activationLink });
        // Отправляем на почту письмо с ссылкой для активации
        await mail_service_1.default.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new user_dto_1.UserDto(user); // id, email, isActivated
        // Создаем refreshToken в БД
        const tokens = token_service_1.default.generateTokens({ ...userDto });
        await token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
    async activate(activationLink) {
        // Поиск в БД пользователя по заданной ссылке активации и обработка ошибки
        const user = await user_model_1.default.findOne({ activationLink });
        if (!user) {
            throw api_error_1.default.BadRequest('Некорректная ссылка активации');
        }
        // "Активируем" учетную запись пользователя, сохраняем
        user.isActivated = true;
        await user.save();
    }
    async login(email, password) {
        // Поиск в БД пользователя
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw api_error_1.default.BadRequest(`Пользователь не найден`);
        }
        // Проверка на соответствие введенного пользователем пароля
        // с хранящимся в БД захэшированным паролем
        const isPassEquals = await bcrypt_1.default.compare(password, user.password);
        if (!isPassEquals) {
            throw api_error_1.default.BadRequest('Неверный пароль');
        }
        // Создаем refreshToken в БД
        const userDto = new user_dto_1.UserDto(user);
        const tokens = token_service_1.default.generateTokens({ ...userDto });
        await token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
    async logout(refreshToken) {
        const token = await token_service_1.default.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        // Если у пользователя токена нет, значит он не авторизован
        if (!refreshToken) {
            throw api_error_1.default.UnauthorizedError();
        }
        const userData = token_service_1.default.validateRefreshToken(refreshToken);
        const tokenFromDb = await token_service_1.default.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw api_error_1.default.UnauthorizedError();
        }
        const user = await user_model_1.default.findById(userData.id);
        if (!user) {
            throw api_error_1.default.UnauthorizedError();
        }
        const userDto = new user_dto_1.UserDto(user);
        const tokens = token_service_1.default.generateTokens({ ...userDto });
        await token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
    async getAllUsers() {
        const users = await user_model_1.default.find();
        return users;
    }
}
exports.default = new UserService();
//# sourceMappingURL=user-service.js.map