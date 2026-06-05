import type {Request , Response} from "express";
import {getMarketPrice } from "../services/marketDataService";

type GetPriceParams = {
    symbol  : string;
}

type GetPriceResponse = {
    symbol : string;
    price : number ;
}

export const getPrice = async (
    req : Request<GetPriceParams>,
    res : Response<GetPriceResponse | {message : string} >
) => {
    try {
        const {symbol} = req.params;

        if(!symbol) {
            return res.status(400).json({
                message : "symbol is required",
            });
        }
         const price = (await getMarketPrice(symbol)) ?? 0;

        return res.status(200).json({
            symbol : symbol.toUpperCase(),
            price,
        });
    } catch (err : unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";

        return res.status(400).json({
            message,
        })
    }
}

export const getAllMarkets = async (_req : Request, res : Response) => {
  try {
    const markets = [
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

    const data = await Promise.all(
      markets.map(async (m) => {
        const price = (await getMarketPrice(m.symbol)) ?? 0;

        return {
          ...m,
          price,
        };
      })
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load markets" });
  }
};