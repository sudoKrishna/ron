"use client";

interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
}

interface Props {
  asks: OrderBookLevel[];
  bids: OrderBookLevel[];
  lastPrice: number;
}

export default function OrderBook({
  asks,
  bids,
  lastPrice,
}: Props) {
  const maxTotal = Math.max(
    ...asks.map((a) => a.total),
    ...bids.map((b) => b.total),
    1
  );

  return (
    <div className="h-full bg-[#0D111C] rounded-xl overflow-hidden">
      
      <div className="flex border-b border-[#1E2433]">
        <button className="px-5 py-4 text-white font-medium border-b-2 border-white">
          Book
        </button>

        <button className="px-5 py-4 text-zinc-500">
          Trades
        </button>
      </div>

    
    
      <div className="grid grid-cols-3 px-4 py-3 text-xs text-zinc-500">
        <div>Price (USD)</div>
        <div className="text-right">Size (BTC)</div>
        <div className="text-right">Total (BTC)</div>
      </div>

      
      <div className="px-2">
        {asks.map((ask) => {
          const width =
            (ask.total / maxTotal) * 100;

          return (
            <div
              key={ask.price}
              className="
                relative
                grid
                grid-cols-3
                px-2
                py-1
                text-sm
              "
            >
              <div
                className="absolute right-0 top-0 h-full bg-red-500/20"
                style={{
                  width: `${width}%`,
                }}
              />

              <span className="relative z-10 text-red-400">
                {ask.price.toLocaleString()}
              </span>

              <span className="relative z-10 text-right text-zinc-300">
                {ask.size}
              </span>

              <span className="relative z-10 text-right text-zinc-300">
                {ask.total}
              </span>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-emerald-400">
            {lastPrice.toLocaleString()}
          </span>

          <span className="text-zinc-500">
            ${(lastPrice + 2).toLocaleString()}
          </span>
        </div>
      </div>

    
      <div className="px-2">
        {bids.map((bid) => {
          const width =
            (bid.total / maxTotal) * 100;

          return (
            <div
              key={bid.price}
              className="
                relative
                grid
                grid-cols-3
                px-2
                py-1
                text-sm
              "
            >
              <div
                className="absolute right-0 top-0 h-full bg-emerald-500/20"
                style={{
                  width: `${width}%`,
                }}
              />

              <span className="relative z-10 text-emerald-400">
                {bid.price.toLocaleString()}
              </span>

              <span className="relative z-10 text-right text-zinc-300">
                {bid.size}
              </span>

              <span className="relative z-10 text-right text-zinc-300">
                {bid.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}