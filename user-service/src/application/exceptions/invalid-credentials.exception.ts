import { BaseException } from "../../shared/exceptions/BaseException";

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super("Invalid credentials", "INVALID_CREDENTIALS");
  }
}
