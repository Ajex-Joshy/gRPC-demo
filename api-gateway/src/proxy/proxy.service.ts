import { Application, Request, Response, NextFunction } from "express";
import logger from "@config/logger.config";
import { serviceConfigs } from "./proxy.config";
import { ProxyFactory } from "./proxy.factory";
import { authMiddleware } from "@middlewares/auth.middleware";

/**
 * ProxyService orchestrates the registration of all API proxies.
 */
export class ProxyService {
  public static setupProxy(app: Application): void {
    serviceConfigs.forEach((service) => {
      const proxyMiddleware = ProxyFactory.create(service);

      const pipeline: any[] = [];

      // Authentication & Authorization check per service
      if (service.requireAuth) {
        pipeline.push((req: Request, res: Response, next: NextFunction) => {
          const isPublic = service.publicRoutes?.some((route) => req.path.startsWith(route));
          if (isPublic) return next();

          return authMiddleware(req, res, () => {
            // Check for admin-only routes
            const isAdminRoute = service.adminRoutes?.some((route) => {
              // If route is "/", it only matches "/" exactly or dynamic IDs (not other defined routes)
              if (route === "/") {
                const nonAdminSubPaths = ["/me", "/register", "/login", "/health"];
                return !nonAdminSubPaths.some((p) => req.path.startsWith(p));
              }
              // Use includes to catch subpaths like /:id/status
              return req.path.includes(route);
            });

            if (isAdminRoute && (req as any).user?.role !== "ADMIN") {
              logger.warn(`Forbidden: User ${(req as any).user?.userId} attempted to access Admin route ${req.path}`);
              return res.status(403).json({
                message: "Forbidden: Admin role required",
                timestamp: new Date().toISOString(),
              });
            }
            next();
          });
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
