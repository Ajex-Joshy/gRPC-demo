import { Order } from "../entities/order.entity";
import { OrderStatus } from "../value-objects/order-status.vo";

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findByUserId(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  updateStatus(id: string, status: OrderStatus): Promise<Order>;
}
