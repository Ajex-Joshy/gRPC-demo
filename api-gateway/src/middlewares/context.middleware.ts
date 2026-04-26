import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { HEADERS } from "@utils/constants";
import { UserPayload } from "@custom-types/user-context.types";

export interface ExtendedRequest extends Request {
  correlationId?: string;
  user?: UserPayload;
}

/**
 * Middleware to normalize request context.
 * Generates/extracts correlation ID and prepares user context.
 */
export const contextMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  // 1. Handle Correlation ID (tracing)
  const correlationId = (req.headers[HEADERS.CORRELATION_ID] as string) || uuidv4();
  req.correlationId = correlationId;
  res.setHeader(HEADERS.CORRELATION_ID, correlationId);

  // 2. Clear sensitive headers that shouldn't be spoofed by clients
  // (Only the gateway should set these when forwarding)
  // delete req.headers[HEADERS.USER_ID];
  // delete req.headers[HEADERS.USER_ROLE];

  next();
};
