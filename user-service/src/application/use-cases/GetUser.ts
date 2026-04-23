import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { OrderDTO } from "../dto/OrderDTO";

export class GetUser {
  constructor(
    private userRepo: IUserRepository,
    private orderClient: { getOrders(userId: string): Promise<OrderDTO[]> },
  ) {}

  async execute(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    const orders: OrderDTO[] = await this.orderClient.getOrders(userId);

    return {
      user,
      orders,
    };
  }
}
