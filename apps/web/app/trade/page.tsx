"use client";

import { useEffect , useState } from "react";
import { useRouter } from "next/navigation";




interface Market {
    symbol : string;
    name : string;
    price : number;
    volume24h : string;
    openInterest : number;
    change24h : number;
    icon : string,
}


export default function MarketPage () {
  const router = useRouter();
    const [markets , setMarkets] = useState<Market[]>([]);

    const fetchMarkets = async () => {
       const res = await fetch (
        "http://localhost:4000/api/markets"
       );
       const data = await res.json()
       console.log("API RESPONSE:", data);
       console.log("ICON:", data[0]?.icon);
       setMarkets(data);
    }

    useEffect(() => {
        fetchMarkets();
        const interval = setInterval(
            fetchMarkets,
            1000
        );
        return () => clearInterval(interval)
    } , []);
    return (
        <div className="min-h-screen bg-[#090B14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="text-left py-4">
                Name
              </th>

              <th className="text-right py-4">
                Price
              </th>

              <th className="text-right py-4">
                24h Volume
              </th>

              <th className="text-right py-4">
                Open Interest
              </th>

              <th className="text-right py-4">
                24h Change
              </th>
            </tr>
          </thead>

          <tbody>
            {markets.map((market) => (
              <tr
                key={market.symbol}
                onClick={() => router.push(`/trade/${market.symbol}`)}
                className="
                  border-b
                  border-zinc-900
                  hover:bg-[#121521]
                  cursor-pointer
                  transition
                "
              >
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <img
                    
                      src={market.icon}
                      className="
                        w-10
                        h-10
                        rounded-full
                      "
                    />
                    

                    <span className="font-medium">
                      {market.name}
                    </span>
                  </div>
                </td>

                <td className="text-right">
                  $
                  {market.price? market.price.toLocaleString() : "Loading..."}
                </td>

                <td className="text-right">
                  ${market.volume24h}
                </td>

                <td className="text-right">
                  ${market.openInterest}
                </td>

                <td
                  className={`text-right font-medium ${
                    market.change24h > 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {market.change24h > 0
                    ? "+"
                    : ""}
                  {market.change24h}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}