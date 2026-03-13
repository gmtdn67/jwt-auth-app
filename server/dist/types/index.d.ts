import { Document, Types } from 'mongoose';
export interface IUser extends Document {
    email: string;
    password: string;
    isActivated: boolean;
    activationLink?: string;
}
export interface IUserDto {
    email: string;
    id: string;
    isActivated: boolean;
}
export interface IToken extends Document {
    user: Types.ObjectId | string;
    refreshToken: string;
}
export interface ITokenPayload {
    email: string;
    id: string;
    isActivated: boolean;
}
export interface ITokens {
    accessToken: string;
    refreshToken: string;
}
export interface IUserData extends ITokens {
    user: IUserDto;
}
export interface IMailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}
//# sourceMappingURL=index.d.ts.map