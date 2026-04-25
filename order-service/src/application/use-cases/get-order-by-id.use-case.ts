import { OrderResponseDTO } from "@application/dto/order-response.dto";
import { OrderMapper } from "@application/mappers/order.mapper";
import type { IOrderRepository } from "@domain/repositories/order.repository";

export class GetOrderById {
  constructor(private repo: IOrderRepository) {}

  async execute(orderId: string): Promise<OrderResponseDTO | null> {
    const order = await this.repo.findById(orderId);
    if (!order) return null;

    return OrderMapper.toDTO(order);
  }
}
