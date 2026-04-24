export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
export class User {
  constructor(
    public readonly _id: string,
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: UserRole,
  ) {}
}
