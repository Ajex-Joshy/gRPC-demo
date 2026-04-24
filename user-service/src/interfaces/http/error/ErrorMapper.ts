import { ForbiddenException } from "../../../application/exceptions/forbidden.exception";
import { InvalidCredentialsException } from "../../../application/exceptions/invalid-credentials.exception";
import { UnauthenticatedException } from "../../../application/exceptions/unauthenticated.exception";
import { UserAlreadyExistsException } from "../../../domain/exceptions/UserAlreadyExists.exception";
import { UserNotFoundException } from "../../../domain/exceptions/UserNotFound.exception";
import { HTTP_STATUS } from "../../../shared/constants/http-status.constants";

export const mapErrorToHttp = (error: unknown) => {
  // DOMAIN
  if (error instanceof UserAlreadyExistsException) {
    return {
      status: HTTP_STATUS.CONFLICT,
      message: error.message,
      code: error.code,
    };
  }

  if (error instanceof UserNotFoundException) {
    return {
      status: HTTP_STATUS.NOT_FOUND,
      message: error.message,
      code: error.code,
    };
  }

  // APPLICATION
  if (
    error instanceof InvalidCredentialsException ||
    error instanceof UnauthenticatedException
  ) {
    return {
      status: HTTP_STATUS.UNAUTHORIZED,
      message: error.message,
      code: error.code,
    };
  }

  if (error instanceof ForbiddenException) {
    return {
      status: HTTP_STATUS.FORBIDDEN,
      message: error.message,
      code: error.code,
    };
  }

  // DEFAULT
  return {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error",
    code: "INTERNAL_ERROR",
  };
};
