import type { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import type { OrderResponseDTO } from "../dto/OrderResponseDTO";
import { OrderMapper } from "../mappers/OrderMapper";

export class GetOrderByUser {
  constructor(private repo: IOrderRepository) {}

  async execute(userId: string): Promise<OrderResponseDTO[] | null> {
    const orders = await this.repo.findOrderByUserId(userId);

    return OrderMapper.toDTOList(orders);
  }
}
