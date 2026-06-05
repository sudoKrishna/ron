import { orderQueue } from "../config/queue";
import { prisma } from "@repo/db";


export type OrderInput = {
  userId: string;
  market: string;
  type: "LONG" | "SHORT";                  
  margin: number;
  qty: number;
  orderType: "limit" | "market";
  price: number;
};


export class OrderService {

  public async createOrder(order: OrderInput) {
    const userId = order.userId;

    const validType =
      order.type === "LONG" || order.type === "SHORT";

    const validOrderType =
      order.orderType === "limit" ||
      order.orderType === "market";

    if (
      !order.userId ||
      !order.market ||
      order.qty == null ||
      order.margin == null ||
      order.price == null
    ) {
      throw new Error("missing required fields");
    }


    if (!validType || !validOrderType) {
      throw new Error("invalid order type");
    }

    if (order.qty <= 0) {
      throw new Error("Quantity must be greater then 0");
    }

    if (order.margin <= 0) {
      throw new Error("margin must be greater then 0");
    }

    if (order.price <= 0) {
      throw new Error("price must be greater then 0");
    }

  
    const user = await prisma.user.findUnique({
      where: { userId },
      include: { collateral: true },
    });

    if (!user) {
      throw new Error("user is not found");
    }

    if (!user.collateral) {
      throw new Error("collateral not found");
    }

  
    if (user.collateral.available.toNumber() < order.margin) {
      throw new Error("insufficient collateral");
    }


    const job = await orderQueue.add(
      "create-order",
      {
        userId,
        order,
      },
      {
        attempts: 3,
        removeOnComplete: true,
      }
    );

    return {
      message: "order queued successfully",
      jobId: job.id,
    };
  }

  public async cancelExistingOrder(orderId: string) {
   
    const order = await prisma.order.findUnique({
      where: { orderId },
    });

    if (!order) {
      throw new Error("order not found");
    }


    if (order.status !== "OPEN") {
      throw new Error("order can not cancelled");
    }

  
    const user = await prisma.user.findUnique({
      where: { userId: order.userId },
      include: { collateral: true },
    });

    if (!user || !user.collateral) {
      throw new Error("user or colletral not found");
    }

    await prisma.collateral.update({
      where: { id: user.collateral.id },
      data: {
        available: {
           increment : order.margin,
        },
        locked: {
          decrement : order.margin,
        }
      },
    });


    const cancelledOrder = await prisma.order.update({
      where: { orderId },
      data: {
        status: "CANCELLED",
      },
    });

    return {
      message: "Order cancelled",
      order: cancelledOrder,
    };
  }
}



