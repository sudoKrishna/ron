import { Router } from "express";
import { getMarketPrice } from "../services/marketDataService";

const router = Router();

const MARKETS = [
  {
    symbol: "BTCUSDT",
    name: "BTC-PERP",
    volume24h: 157700000,
    openInterest: 34000000,
    change24h: -3.27,
    icon: "/coins/btc.png",
  },
  {
    symbol: "ETHUSDT",
    name: "ETH-PERP",
    volume24h: 8800000,
    openInterest: 8400000,
    change24h: -2.85,
    icon: "/coins/eth.png",
  },
  {
    symbol: "SOLUSDT",
    name: "SOL-PERP",
    volume24h: 10000000,
    openInterest: 18900000,
    change24h: -4.01,
    icon: "/coins/sol.png",
  },
  {
    symbol: "BNBUSDT",
    name: "BNB-PERP",
    volume24h: 8500000,
    openInterest: 1500000,
    change24h: -6.17,
    icon: "/coins/bnb.png",
  },
];

router.get("/", async (_req, res) => {
  const data = await Promise.all(
    MARKETS.map(async (market) => {
      const price = await getMarketPrice(market.symbol);

      const result = {
        ...market,
        price,
      };

      console.log("BACKEND MARKET:", result); 

      return result;
    })
  );

  console.log("FINAL RESPONSE:", data);
  console.log("MARKETS:", MARKETS);

  res.json(data);
});
export default router;