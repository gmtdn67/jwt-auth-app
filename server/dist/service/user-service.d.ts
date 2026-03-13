import { IUserData, IUser } from '../types';
declare class UserService {
    registration(email: string, password: string): Promise<IUserData>;
    activate(activationLink: string): Promise<void>;
    login(email: string, password: string): Promise<IUserData>;
    logout(refreshToken: string): Promise<any>;
    refresh(refreshToken: string): Promise<IUserData>;
    getAllUsers(): Promise<IUser[]>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user-service.d.ts.map