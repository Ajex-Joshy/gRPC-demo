import type { NextFunction, Request, Response } from "express";
import { mapErrorToHttp } from "../error/ErrorMapper";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const e = mapErrorToHttp(err);

  res.status(e.status).json({
    message: e.message,
    code: e.code,
  });
};
