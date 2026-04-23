"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderByUser = void 0;
const OrderMapper_1 = require("../mappers/OrderMapper");
class GetOrderByUser {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(userId) {
        const orders = await this.repo.findOrderByUserId(userId);
        return OrderMapper_1.OrderMapper.toDTOList(orders);
    }
}
exports.GetOrderByUser = GetOrderByUser;
//# sourceMappingURL=GetOrderByUser.js.map