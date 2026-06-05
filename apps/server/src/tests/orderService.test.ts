import { describe, it, expect, beforeEach, vi } from "vitest";
import { OrderService } from "../services/orderService";
import { prisma } from "@repo/db";
import { orderQueue } from "../config/queue";


const services = new OrderService();


vi.mock("@repo/db", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    order: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    collateral: {
      update: vi.fn(),
    },
  },
}));

vi.mock("../config/queue", () => ({
  orderQueue: {
    add: vi.fn(),
  },
}));

// -------------------- TESTS --------------------

describe("Order Service (Vitest)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---------------- CREATE ORDER ----------------

  it("should create order and return jobId", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      userId: "1",
      collateral: {
        id: "col-1",
        available: {
          toNumber: () => 1000,
        },
        locked: {
          toNumber: () => 200,
        },
      },
    });

    (orderQueue.add as any).mockResolvedValue({
      id: "job-123",
    });

    const result = await services.createOrder({
      userId: "1",
      market: "BTC",
      type: "LONG",
      margin: 100,
      qty: 2,
      orderType: "limit",
      price: 50000,
    });

    expect(result.message).toBe("order queued successfully");
    expect(result.jobId).toBe("job-123");

    expect(orderQueue.add).toHaveBeenCalledTimes(1);
  });

  // ---------------- CANCEL ORDER ----------------

  it("should cancel order successfully", async () => {
    (prisma.order.findUnique as any).mockResolvedValue({
      orderId: "101",
      userId: "1",
      status: "OPEN",
      margin: {
        toNumber: () => 100,
      },
    });

    (prisma.user.findUnique as any).mockResolvedValue({
      userId: "1",
      collateral: {
        id: "col-1",
        available: {
          toNumber: () => 900,
        },
        locked: {
          toNumber: () => 100,
        },
      },
    });

    (prisma.collateral.update as any).mockResolvedValue({});
    (prisma.order.update as any).mockResolvedValue({
      orderId: "101",
      status: "CANCELLED",
    });

    const result = await services.cancelExistingOrder("101");

    expect(result.message).toBe("Order cancelled");
    expect(result.order.status).toBe("CANCELLED");

    expect(prisma.collateral.update).toHaveBeenCalled();
    expect(prisma.order.update).toHaveBeenCalled();
  });

  // ---------------- ERROR: ORDER NOT FOUND ----------------

  it("should throw if order not found", async () => {
    (prisma.order.findUnique as any).mockResolvedValue(null);

    await expect(services.cancelExistingOrder("101")).rejects.toThrow(
      "order not found"
    );
  });

  // ---------------- ERROR: INSUFFICIENT COLLATERAL ----------------

  it("should throw if insufficient collateral", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      userId: "1",
      collateral: {
        available: {
          toNumber: () => 10,
        },
      },
    });

    await expect(
      services.createOrder({
        userId: "1",
        market: "BTC",
        type: "LONG",
        margin: 1000,
        qty: 1,
        orderType: "limit",
        price: 50000,
      })
    ).rejects.toThrow("insufficient collateral");
  });
});