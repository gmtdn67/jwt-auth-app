import { NextFunction, Response, Request } from 'express';
import ApiError from '../exceptions/api-error';

export default function ( 
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response | void {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    message: 'Непредвиденная ошибка',
  });
}

