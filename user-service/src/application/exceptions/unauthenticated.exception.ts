import { BaseException } from "../../shared/exceptions/BaseException";

export class UnauthenticatedException extends BaseException {
  constructor(message = "Unauthenticated") {
    super(message, "UNAUTHENTICATED");
    Object.setPrototypeOf(this, UnauthenticatedException.prototype);
  }
}
