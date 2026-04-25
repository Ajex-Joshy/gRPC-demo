import path from "node:path";
import { GetOrderByUser } from "@application/use-cases/get-order-by-user.use-case";
import { PrismaOrderRepository } from "@infrastructure/db/prisma/prisma-order.repository";
import "dotenv/config";

class InMemoryOrderRepository {
	private readonly orders = [
		{ id: "o101", userId: "u1", product: "MacBook Pro", quantity: 1 },
		{ id: "o102", userId: "u1", product: "Magic Mouse", quantity: 2 },
		{ id: "o201", userId: "u2", product: "Mechanical Keyboard", quantity: 1 },
	];

	async findByUserId(userId: string) {
		return this.orders.filter((order) => order.userId === userId) as any;
	}

	async create(order: any): Promise<any> {
		throw new Error("Method not implemented.");
	}
	async findById(id: string): Promise<any | null> {
		throw new Error("Method not implemented.");
	}
	async updateStatus(id: string, status: any): Promise<any> {
		throw new Error("Method not implemented.");
	}
}

function buildOrderRepository() {
	if (process.env.USE_IN_MEMORY_DEMO === "true" || !process.env.DATABASE_URL) {
		console.log("Using in-memory order repository");
		return new InMemoryOrderRepository();
	}

	return new PrismaOrderRepository();
}

async function start() {
	const repo = buildOrderRepository();

	console.log("Order Service initializing layers...");

	// TODO: Initialize REST framework/Express here in future step
}

start();
