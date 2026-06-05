import type { Order } from "./priceLevel";

class OrderIndex {
    private orders = new Map<string , Order>();

    add(order : Order) : void {
        this.orders.set(order.id , order)
    }

    find(orderId : string) : void {
      this.orders.get(orderId);
    }

    remove(orderId : string) : void {
        this.orders.delete(orderId);
    }
    has(orderId : string) : boolean {
        return this.orders.has(orderId)
    }

    size() : number {
        return this.orders.size
    }
 }
