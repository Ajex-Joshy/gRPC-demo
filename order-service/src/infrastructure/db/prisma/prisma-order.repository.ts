import { Order } from "../../../domain/entities/order.entity";
import type { IOrderRepository } from "../../../domain/repositories/order.repository";
import { prisma } from "./prisma.client";

export class PrismaOrderRepository implements IOrderRepository {
	async findByUserId(userId: string): Promise<Order[]> {
		try {
			const data = await prisma.order.findMany({
				where: { userId },
			});
			return data.map(
				(o: any) => new Order(o.id, o.userId, o.product, o.quantity, o.price || 0, o.status || "PENDING", o.createdAt || new Date()),
			);
		} catch (error) {
			throw new Error("Database error in fetching orders");
		}
	}

	async create(order: Order): Promise<Order> {
		throw new Error("Method not implemented.");
	}
	async findById(id: string): Promise<Order | null> {
		throw new Error("Method not implemented.");
	}
	async updateStatus(id: string, status: any): Promise<Order> {
		throw new Error("Method not implemented.");
	}
}
