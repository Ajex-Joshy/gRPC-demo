import { BaseException } from "../../shared/exceptions/BaseException";

export class ForbiddenException extends BaseException {
  constructor(message = "Forbidden") {
    super(message, "FORBIDDEN");
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}
