import * as grpc from "@grpc/grpc-js";
import { GetUserCall, GetUserCallback } from "../types/user.grpc.types";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/di/types";
import { GetUserById } from "../../../application/use-cases/get-user-by-id.use-case";
import { UserNotFoundException } from "../../../domain/exceptions/UserNotFound.exception";

@injectable()
export class UserGrpcController {
  constructor(@inject(TYPES.GetUserById) private getUserById: GetUserById) {}

  GetUser = async (call: GetUserCall, callback: GetUserCallback) => {
    try {
      const { userId } = call.request;
      console.log(userId);

      const user = await this.getUserById.execute(userId);

      if (!user) throw new UserNotFoundException(userId);

      return callback(null, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: error.message,
        } as grpc.ServiceError);
      }

      const message = error instanceof Error ? error.message : "Unknown error";

      return callback({
        code: grpc.status.INTERNAL,
        message,
      } as any);
    }
  };
}
