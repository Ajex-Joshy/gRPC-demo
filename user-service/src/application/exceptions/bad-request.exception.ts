import { BaseException } from "../../shared/exceptions/BaseException";

export class BadRequestException extends BaseException {
  constructor(message: string = "Bad Request") {
    super(message, "BAD_REQUEST");
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
