import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { PrismaOrderRepository } from "./src/infrastructure/db/prisma/PrismaOrderRepository";
import { GetOrderByUser } from "./src/application/use-cases/GetOrderByUser";
import { OrderController } from "./src/interfaces/grpc/OrderController";
import path from "node:path";
import "dotenv/config";

class InMemoryOrderRepository {
  private readonly orders = [
    { id: "o101", userId: "u1", product: "MacBook Pro", quantity: 1 },
    { id: "o102", userId: "u1", product: "Magic Mouse", quantity: 2 },
    { id: "o201", userId: "u2", product: "Mechanical Keyboard", quantity: 1 },
  ];

  async findOrderByUserId(userId: string) {
    return this.orders.filter((order) => order.userId === userId);
  }
}

const orderProtoPath = path.resolve(process.cwd(), "../proto/order.proto");

function buildOrderRepository() {
  if (process.env.USE_IN_MEMORY_DEMO === "true" || !process.env.DATABASE_URL) {
    console.log("Using in-memory order repository");
    return new InMemoryOrderRepository();
  }

  return new PrismaOrderRepository();
}

async function start() {
  const repo = buildOrderRepository();
  const useCase = new GetOrderByUser(repo);
  const controller = new OrderController(useCase);

  const def = protoLoader.loadSync(orderProtoPath);
  const proto = grpc.loadPackageDefinition(def) as any;

  const server = new grpc.Server();

  server.addService(proto.OrderService.service, {
    GetOrdersByUser: controller.GetOrdersByUser,
  });

  server.bindAsync(
    "0.0.0.0:50052",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("Order Service running on 50052");
      server.start();
    },
  );
}

start();
