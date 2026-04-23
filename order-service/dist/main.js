"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const PrismaOrderRepository_1 = require("./src/infrastructure/db/prisma/PrismaOrderRepository");
const GetOrderByUser_1 = require("./src/application/use-cases/GetOrderByUser");
const OrderController_1 = require("./src/interfaces/grpc/OrderController");
const node_path_1 = __importDefault(require("node:path"));
require("dotenv/config");
class InMemoryOrderRepository {
    orders = [
        { id: "o101", userId: "u1", product: "MacBook Pro", quantity: 1 },
        { id: "o102", userId: "u1", product: "Magic Mouse", quantity: 2 },
        { id: "o201", userId: "u2", product: "Mechanical Keyboard", quantity: 1 },
    ];
    async findOrderByUserId(userId) {
        return this.orders.filter((order) => order.userId === userId);
    }
}
const orderProtoPath = node_path_1.default.resolve(process.cwd(), "../proto/order.proto");
function buildOrderRepository() {
    if (process.env.USE_IN_MEMORY_DEMO === "true" || !process.env.DATABASE_URL) {
        console.log("Using in-memory order repository");
        return new InMemoryOrderRepository();
    }
    return new PrismaOrderRepository_1.PrismaOrderRepository();
}
async function start() {
    const repo = buildOrderRepository();
    const useCase = new GetOrderByUser_1.GetOrderByUser(repo);
    const controller = new OrderController_1.OrderController(useCase);
    const def = protoLoader.loadSync(orderProtoPath);
    const proto = grpc.loadPackageDefinition(def);
    const server = new grpc.Server();
    server.addService(proto.OrderService.service, {
        GetOrdersByUser: controller.GetOrdersByUser,
    });
    server.bindAsync("0.0.0.0:50052", grpc.ServerCredentials.createInsecure(), () => {
        console.log("Order Service running on 50052");
        server.start();
    });
}
start();
//# sourceMappingURL=main.js.map