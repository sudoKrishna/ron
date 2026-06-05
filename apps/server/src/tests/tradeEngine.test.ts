import { describe, it, expect, beforeEach } from "vitest";
import { TradeEngine, type Order } from "../services/tradeEngine";

describe("TradeEngine", () => {
  let engine: TradeEngine;

  beforeEach(() => {
    engine = new TradeEngine();
  });

  it("adds unmatched BUY limit order to bids", () => {
    const order: Order = {
      id: "1",
      userId: 1,
      market: "BTCUSDT",
      qty: 5,
      price: 100,
      side: "BUY",
      type: "LIMIT",
      createdAt: Date.now(),
    };

    const trades = engine.processOrder(order);

    expect(trades).toHaveLength(0);

    const book = engine.getOrderBook();

    expect(book.bids).toHaveLength(1);
    expect(book.bids[0]?.id).toBe("1");
  });

  it("matches limit buy against existing ask", () => {
    engine.processOrder({
      id: "sell1",
      userId: 2,
      market: "BTCUSDT",
      qty: 5,
      price: 100,
      side: "SELL",
      type: "LIMIT",
      createdAt: Date.now(),
    });

    const trades = engine.processOrder({
      id: "buy1",
      userId: 1,
      market: "BTCUSDT",
      qty: 5,
      price: 100,
      side: "BUY",
      type: "LIMIT",
      createdAt: Date.now(),
    });

    expect(trades).toHaveLength(1);

    expect(trades[0]).toMatchObject({
      buyOrderId: "buy1",
      sellOrderId: "sell1",
      price: 100,
      qty: 5,
    });

    expect(engine.getOrderBook().asks).toHaveLength(0);
  });

  it("supports partial fills", () => {
    engine.processOrder({
      id: "sell1",
      userId: 2,
      market: "BTCUSDT",
      qty: 3,
      price: 100,
      side: "SELL",
      type: "LIMIT",
      createdAt: Date.now(),
    });

    engine.processOrder({
      id: "buy1",
      userId: 1,
      market: "BTCUSDT",
      qty: 10,
      price: 100,
      side: "BUY",
      type: "LIMIT",
      createdAt: Date.now(),
    });

    const book = engine.getOrderBook();

    expect(book.bids).toHaveLength(1);
    expect(book.bids[0]?.qty).toBe(7);
  });

  it("executes market buy", () => {
    engine.processOrder({
      id: "sell1",
      userId: 2,
      market: "BTCUSDT",
      qty: 5,
      price: 100,
      side: "SELL",
      type: "LIMIT",
      createdAt: Date.now(),
    });

    const trades = engine.processOrder({
      id: "buy1",
      userId: 1,
      market: "BTCUSDT",
      qty: 5,
      side: "BUY",
      type: "MARKET",
      createdAt: Date.now(),
    });

    expect(trades).toHaveLength(1);

    expect(trades[0]).toMatchObject({
      buyOrderId: "buy1",
      sellOrderId: "sell1",
      price: 100,
      qty: 5,
    });
  });

  it("executes market sell", () => {
    engine.processOrder({
      id: "buy1",
      userId: 1,
      market: "BTCUSDT",
      qty: 5,
      price: 100,
      side: "BUY",
      type: "LIMIT",
      createdAt: Date.now(),
    });

    const trades = engine.processOrder({
      id: "sell1",
      userId: 2,
      market: "BTCUSDT",
      qty: 5,
      side: "SELL",
      type: "MARKET",
      createdAt: Date.now(),
    });

    expect(trades).toHaveLength(1);
    expect(trades[0]?.price).toBe(100);
  });

  it("cancels bid order", () => {
    engine.processOrder({
      id: "buy1",
      userId: 1,
      market: "BTCUSDT",
      qty: 5,
      price: 100,
      side: "BUY",
      type: "LIMIT",
      createdAt: Date.now(),
    });

    const cancelled = engine.cancelOrder("buy1");

    expect(cancelled).toBe(true);
    expect(engine.getOrderBook().bids).toHaveLength(0);
  });

  it("cancels ask order", () => {
    engine.processOrder({
      id: "sell1",
      userId: 2,
      market: "BTCUSDT",
      qty: 5,
      price: 100,
      side: "SELL",
      type: "LIMIT",
      createdAt: Date.now(),
    });

    const cancelled = engine.cancelOrder("sell1");

    expect(cancelled).toBe(true);
    expect(engine.getOrderBook().asks).toHaveLength(0);
  });

  it("returns false when order does not exist", () => {
    expect(engine.cancelOrder("missing")).toBe(false);
  });

  it("throws if LIMIT order has no price", () => {
    expect(() =>
      engine.processOrder({
        id: "1",
        userId: 1,
        market: "BTCUSDT",
        qty: 1,
        side: "BUY",
        type: "LIMIT",
        createdAt: Date.now(),
      } as Order)
    ).toThrow("limit orders must have a price");
  });
});