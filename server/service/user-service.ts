import UserModel from '../models/user-model';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mailService from './mail-service';
import tokenService from './token-service';
import { UserDto } from '../dtos/user-dto';
import ApiError from '../exceptions/api-error';
import { IUserData, IUser } from '../types';

class UserService {
  async registration(email: string, password: string): Promise<IUserData> {
    const candidate = await UserModel.findOne({ email });

    // Проверка на наличии в БД пользователя с заданным email
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с таким почтовым адресом существует`, []);
    }

    // Хэшируем пароль и создаем динамическую часть ссылки для активации
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    // Сохраняем пользователя в БД
    const user = await UserModel.create({ email, password: hashPassword, activationLink });

    // Отправляем на почту письмо с ссылкой для активации
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user); // id, email, isActivated

    // Создаем refreshToken в БД
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async activate(activationLink: string): Promise<void> {
    // Поиск в БД пользователя по заданной ссылке активации и обработка ошибки
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }

    // "Активируем" учетную запись пользователя, сохраняем
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string): Promise<IUserData> {
    // Поиск в БД пользователя
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь не найден`);
    }

    // Проверка на соответствие введенного пользователем пароля
    // с хранящимся в БД захэшированным паролем
    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    // Создаем refreshToken в БД
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string): Promise<any> {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string): Promise<IUserData> {
    // Если у пользователя токена нет, значит он не авторизован
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await UserModel.find();
    return users;
  }
}

export default new UserService();

