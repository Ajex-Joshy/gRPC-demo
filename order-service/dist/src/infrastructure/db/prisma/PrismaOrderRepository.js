"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaOrderRepository = void 0;
const Order_1 = require("../../../domain/entities/Order");
const PrismaClient_1 = require("./PrismaClient");
class PrismaOrderRepository {
    async findOrderByUserId(userId) {
        try {
            const data = await PrismaClient_1.prisma.order.findMany({
                where: { userId },
            });
            return data.map((o) => new Order_1.Order(o.id, o.userId, o.product, o.quantity));
        }
        catch (error) {
            throw new Error("Database error in fetching orders");
        }
    }
}
exports.PrismaOrderRepository = PrismaOrderRepository;
//# sourceMappingURL=PrismaOrderRepository.js.map