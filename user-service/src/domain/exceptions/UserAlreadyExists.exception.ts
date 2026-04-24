import { BaseException } from "../../shared/exceptions/BaseException";

export class UserAlreadyExistsException extends BaseException {
  constructor(email: string) {
    super(`User with email ${email} already exists`, "USER_ALREADY_EXISTS");
  }
}
