"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
class GetUser {
    userRepo;
    orderClient;
    constructor(userRepo, orderClient) {
        this.userRepo = userRepo;
        this.orderClient = orderClient;
    }
    async execute(userId) {
        const user = await this.userRepo.findById(userId);
        if (!user)
            throw new Error("User not found");
        const orders = await this.orderClient.getOrders(userId);
        return {
            user,
            orders,
        };
    }
}
exports.GetUser = GetUser;
//# sourceMappingURL=GetUser.js.map