import { OrderStatus } from "../value-objects/order-status.vo";

export class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public item: string,
    public quantity: number,
    public price: number,
    public status: OrderStatus,
    public readonly createdAt: Date,
  ) {
    this.validate();
  }

  private validate() {
    if (!this.userId) {
      throw new Error("UserId is required");
    }

    if (!this.item || this.item.trim().length === 0) {
      throw new Error("Item is required");
    }

    if (this.quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    if (this.price <= 0) {
      throw new Error("Price must be greater than 0");
    }
  }

  updateStatus(newStatus: OrderStatus) {
    if (this.status === OrderStatus.DELIVERED) {
      throw new Error("Cannot update a delivered order");
    }

    this.status = newStatus;
  }
}
