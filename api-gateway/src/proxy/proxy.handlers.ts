import { Request, Response } from "express";
import { IncomingMessage, ServerResponse } from "http";
import logger from "@config/logger.config";
import { HTTP_STATUS } from "@utils/http-status";
import { ProxyErrorResponse } from "@custom-types/proxy-error-response.types";
import { HEADERS } from "@utils/constants";

export class ProxyHandlers {
  /**
   * Handle errors during the proxy process (e.g. downstream service down)
   */
  public static handleProxyError(err: Error, req: IncomingMessage, res: any): void {
    const correlationId = (req as any).correlationId;
    
    logger.error(`[Proxy] Error on ${req.method} ${req.url}`, {
      error: err.message,
      correlationId,
    });
    
    const errorResponse: ProxyErrorResponse = {
      message: "Downstream service unavailable",
      status: HTTP_STATUS.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
      correlationId,
    };

    // Check if it's a standard HTTP response (has writeHead)
    if (res.writeHead && !res.headersSent) {
      res.writeHead(HTTP_STATUS.SERVICE_UNAVAILABLE, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(errorResponse));
    } else if (res.destroy) {
      // If it's a socket, just destroy it
      res.destroy();
    }
  }

  /**
   * Modify request before it is sent to the target
   */
  public static handleProxyRequest(proxyReq: any, req: any): void {
    // 1. Forward Correlation ID for tracing
    if (req.correlationId) {
      proxyReq.setHeader(HEADERS.CORRELATION_ID, req.correlationId);
    }

    // 2. Forward Verified User Context
    if (req.user) {
      proxyReq.setHeader(HEADERS.USER_ID, req.user.userId);
      proxyReq.setHeader(HEADERS.USER_ROLE, req.user.role);
    }

    logger.debug(`[Proxy] Forwarding to ${req.originalUrl}`, {
      correlationId: req.correlationId,
      userId: req.user?.userId,
    });
  }

  /**
   * Modify response before it is sent back to the client
   */
  public static handleProxyResponse(proxyRes: IncomingMessage, req: IncomingMessage, res: any): void {
    // Header adjustments if needed
  }
}
