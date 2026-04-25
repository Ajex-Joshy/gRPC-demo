import { status } from "@grpc/grpc-js";
import { BaseException } from "../../shared/exceptions/BaseException";
import { HTTP_STATUS } from "../../shared/constants/http-status.constants";

export class OrderStateTransitionException extends BaseException {
  constructor(message: string) {
    super(
      message,
      "ORDER_STATE_TRANSITION_ERROR",
      HTTP_STATUS.PRECONDITION_FAILED,
      status.FAILED_PRECONDITION,
    );
    Object.setPrototypeOf(this, OrderStateTransitionException.prototype);
  }
}
