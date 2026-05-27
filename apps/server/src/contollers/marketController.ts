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
        const price = await getMarketPrice(symbol);

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