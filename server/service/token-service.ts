import jwt from 'jsonwebtoken';
import TokenModel from '../models/token-model';
import { ITokenPayload, ITokens, IToken } from '../types';

class TokenService {
  generateTokens(payload: ITokenPayload): ITokens {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string): ITokenPayload | null {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as ITokenPayload;
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string): ITokenPayload | null {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as ITokenPayload;
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string): Promise<IToken> {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string): Promise<any> {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string): Promise<IToken | null> {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();

