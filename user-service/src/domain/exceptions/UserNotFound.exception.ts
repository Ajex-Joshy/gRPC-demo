import { BaseException } from "../../shared/exceptions/BaseException";

export class UserNotFoundException extends BaseException {
  constructor(id: string) {
    super(`User with id ${id} not found`, "USER_NOT_FOUND");
  }
}
