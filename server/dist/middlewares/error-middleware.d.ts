import { NextFunction, Response, Request } from 'express';
import ApiError from '../exceptions/api-error';
export default function (err: Error | ApiError, _req: Request, res: Response, _next: NextFunction): Response | void;
//# sourceMappingURL=error-middleware.d.ts.map