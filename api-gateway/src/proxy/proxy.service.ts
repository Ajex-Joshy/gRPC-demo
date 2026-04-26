import { Application, Request, Response, NextFunction } from "express";
import logger from "@config/logger.config.js";
import { serviceConfigs } from "./proxy.config.js";
import { ProxyFactory } from "./proxy.factory.js";
import { authMiddleware } from "@middlewares/auth.middleware.js";

/**
 * ProxyService orchestrates the registration of all API proxies.
 */
export class ProxyService {
  public static setupProxy(app: Application): void {
    serviceConfigs.forEach((service) => {
      const proxyMiddleware = ProxyFactory.create(service);

      const pipeline: any[] = [];

      // authentication check per service
      if (service.requireAuth) {
        pipeline.push((req: Request, res: Response, next: NextFunction) => {
          const isPublic = service.publicRoutes?.some((p) =>
            req.path.startsWith(p),
          );
          if (isPublic) {
            return next();
          }
          return authMiddleware(req, res, next);
        });
      }

      // Add the proxy middleware
      pipeline.push(proxyMiddleware);

      // Register with Express
      app.use(service.path, ...pipeline);

      logger.info(
        `[Proxy] Service Registered: ${service.name} mounted at ${service.path} (Auth: ${!!service.requireAuth})`,
      );
    });
  }
}
