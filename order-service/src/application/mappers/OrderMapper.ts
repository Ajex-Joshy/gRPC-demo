import { Order } from "../../domain/entities/Order";
import type { OrderResponseDTO } from "../dto/OrderResponseDTO";

export class OrderMapper {
  static toDTO(order: Order): OrderResponseDTO {
    return {
      id: order.id,
      product: order.product,
      quantity: order.quantity,
    };
  }

  static toDTOList(orders: Order[] | null): OrderResponseDTO[] {
    if (!orders) return [];
    return orders.map(this.toDTO);
  }
}
