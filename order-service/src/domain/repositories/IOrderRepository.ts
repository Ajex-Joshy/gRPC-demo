import { Order } from "../entities/Order";

export interface IOrderRepository {
  findOrderByUserId(userId: string): Promise<Order[] | null>;
}
