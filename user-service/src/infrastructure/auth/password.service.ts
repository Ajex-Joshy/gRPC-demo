import bcrypt from "bcrypt";
import { injectable } from "inversify";

@injectable()
export class PasswordService {
  async hash(p: string) {
    return bcrypt.hash(p, 10);
  }
  async compare(p: string, h: string) {
    return bcrypt.compare(p, h);
  }
}
