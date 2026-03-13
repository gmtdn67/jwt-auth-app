import { Request, Response, NextFunction } from 'express';
declare class UserController {
    registration(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    login(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    activate(req: Request, res: Response, next: NextFunction): Promise<void>;
    refresh(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getUsers(_req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=user-controller.d.ts.map