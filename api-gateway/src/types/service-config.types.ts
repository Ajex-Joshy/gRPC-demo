export interface ServiceConfig {
  path: string;
  url: string;
  pathRewrite: Record<string, string>;
  name: string;
  timeout?: number;
  requireAuth?: boolean;
  publicRoutes?: string[]; // Routes that DON'T need auth even if requireAuth is true
  adminRoutes?: string[];  // Routes that specifically require ADMIN role
}
