"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMapper = void 0;
class OrderMapper {
    static toDTO(order) {
        return {
            id: order.id,
            product: order.product,
            quantity: order.quantity,
        };
    }
    static toDTOList(orders) {
        if (!orders)
            return [];
        return orders.map(this.toDTO);
    }
}
exports.OrderMapper = OrderMapper;
//# sourceMappingURL=OrderMapper.js.map