"use client";

import { useMemo, useState } from "react";

export default function OrderForm() {
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");

  const [orderType, setOrderType] = useState<
    "LIMIT" | "MARKET"
  >("LIMIT");

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(false);

  const leverage = 10;

  const orderValue = useMemo(() => {
    return (
      Number(price || 0) *
      Number(quantity || 0)
    );
  }, [price, quantity]);

  const marginRequired = useMemo(() => {
    return orderValue / leverage;
  }, [orderValue]);

  const handleSubmit = async () => {
    try {
      console.log("SUBMIT HIT");
      console.log("REQUEST URL => /order");
      setLoading(true);

      const payload = {
        market: "BTC-USD",
        type:
          side === "BUY"
            ? "LONG"
            : "SHORT",

        qty: Number(quantity),

        margin: Number(
          marginRequired.toFixed(2)
        ),

        price: Number(price),

        orderType:
          orderType.toLowerCase(),
      };

      if (
        !payload.qty ||
        !payload.price
      ) {
        alert("Enter valid values");
        return;
      }
      const token = localStorage.getItem("token")
      console.log("Token" , token)

      const response = await fetch(
        "http://localhost:4000/orders",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
              Authorization : `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create order"
        );
      }

      alert(
        "Order queued successfully"
      );

      setPrice("");
      setQuantity("");
    } catch (error: any) {
      alert(
        error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-[#0D111C] rounded-xl p-4 text-white">
      {/* BUY / SELL */}
      <div className="flex bg-[#141927] rounded-xl p-1 mb-5">
        <button
          onClick={() =>
            setSide("BUY")
          }
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            side === "BUY"
              ? "bg-[#0A3E34] text-[#00D395]"
              : "text-zinc-400"
          }`}
        >
          Buy / Long
        </button>

        <button
          onClick={() =>
            setSide("SELL")
          }
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            side === "SELL"
              ? "bg-[#431E25] text-[#F6465D]"
              : "text-zinc-400"
          }`}
        >
          Sell / Short
        </button>
      </div>

      {/* ORDER TYPE */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() =>
            setOrderType("LIMIT")
          }
          className={`px-3 py-2 rounded-lg ${
            orderType === "LIMIT"
              ? "bg-[#1A2030]"
              : "text-zinc-400"
          }`}
        >
          Limit
        </button>

        <button
          onClick={() =>
            setOrderType("MARKET")
          }
          className={`px-3 py-2 rounded-lg ${
            orderType === "MARKET"
              ? "bg-[#1A2030]"
              : "text-zinc-400"
          }`}
        >
          Market
        </button>
      </div>

      {/* AVAILABLE EQUITY */}
      <div className="flex justify-between text-sm text-zinc-400 mb-4">
        <span>Available Equity</span>
        <span>$0.00</span>
      </div>

      {/* PRICE */}
      <div className="mb-4">
        <div className="flex justify-between text-zinc-400 text-sm mb-2">
          <span>Price</span>
        </div>

        <div className="relative">
          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            placeholder="70291.5"
            className="
              w-full
              bg-[#161C28]
              rounded-xl
              px-4
              py-4
              outline-none
              text-lg
            "
          />

          <div
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              w-8
              h-8
              rounded-full
              bg-green-500
              flex
              items-center
              justify-center
              text-sm
              font-bold
            "
          >
            $
          </div>
        </div>
      </div>

      {/* QUANTITY */}
      <div className="mb-5">
        <div className="text-sm text-zinc-400 mb-2">
          Quantity
        </div>

        <div className="relative">
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            placeholder="0"
            className="
              w-full
              bg-[#161C28]
              rounded-xl
              px-4
              py-4
              outline-none
              text-lg
            "
          />

          <div
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              w-8
              h-8
              rounded-full
              bg-orange-500
              flex
              items-center
              justify-center
              text-sm
              font-bold
            "
          >
            ₿
          </div>
        </div>
      </div>

      {/* LEVERAGE BAR */}
      <div className="mb-6">
        <input
          type="range"
          min={1}
          max={100}
          value={leverage}
          readOnly
          className="w-full"
        />

        <div className="flex justify-between text-sm text-zinc-500 mt-2">
          <span>1x</span>
          <span>
            {leverage}x
          </span>
        </div>
      </div>

      {/* ORDER VALUE */}
      <div className="mb-5">
        <div className="text-sm text-zinc-400 mb-2">
          Order Value
        </div>

        <div className="bg-[#161C28] rounded-xl px-4 py-4">
          $
          {orderValue.toFixed(2)}
        </div>
      </div>

      {/* STATS */}
      <div className="space-y-2 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-zinc-400">
            Margin Required
          </span>

          <span>
            $
            {marginRequired.toFixed(
              2
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Est. Liquidation Price
          </span>

          <span>—</span>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="
          w-full
          py-4
          rounded-xl
          bg-[#00B26A]
          text-black
          font-semibold
          mb-5
          disabled:opacity-50
        "
      >
        {loading
          ? "Submitting..."
          : side === "BUY"
          ? "Place Long Order"
          : "Place Short Order"}
      </button>

      {/* OPTIONS */}
      <div className="space-y-3 text-sm text-zinc-400">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
          />
          Post Only
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
          />
          IOC
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
          />
          Reduce Only
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
          />
          TP / SL
        </label>
      </div>
    </div>
  );
}