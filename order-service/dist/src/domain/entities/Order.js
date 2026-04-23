"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    id;
    userId;
    product;
    quantity;
    constructor(id, userId, product, quantity) {
        this.id = id;
        this.userId = userId;
        this.product = product;
        this.quantity = quantity;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map