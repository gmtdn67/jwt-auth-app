import { ITokenPayload, ITokens, IToken } from '../types';
declare class TokenService {
    generateTokens(payload: ITokenPayload): ITokens;
    validateAccessToken(token: string): ITokenPayload | null;
    validateRefreshToken(token: string): ITokenPayload | null;
    saveToken(userId: string, refreshToken: string): Promise<IToken>;
    removeToken(refreshToken: string): Promise<any>;
    findToken(refreshToken: string): Promise<IToken | null>;
}
declare const _default: TokenService;
export default _default;
//# sourceMappingURL=token-service.d.ts.map