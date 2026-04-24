import { BaseException } from "../../shared/exceptions/BaseException";

export class DatabaseException extends BaseException {
  constructor(message: string) {
    super(message, "DATABASE_ERROR");
  }
}
