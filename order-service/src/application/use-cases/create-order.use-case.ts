import { Order } from "@domain/entities/order.entity";
import type { IOrderRepository } from "@domain/repositories/order.repository";
import { OrderStatus } from "@domain/value-objects/order-status.vo";
import { OrderResponseDTO } from "@application/dto/order-response.dto";
import { OrderMapper } from "@application/mappers/order.mapper";

export class CreateOrder {
  constructor(private repo: IOrderRepository) {}

  async execute(
    id: string,
    userId: string,
    item: string,
    quantity: number,
    price: number,
  ): Promise<OrderResponseDTO> {
    const order = new Order(
      id,
      userId,
      item,
      quantity,
      price,
      OrderStatus.PENDING,
      new Date(),
    );

    const createdOrder = await this.repo.create(order);
    return OrderMapper.toDTO(createdOrder);
  }
}
