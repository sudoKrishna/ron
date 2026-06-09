// if new order aaya to is book ke keskis order se match karana hai 
// Book:

// SELL 5 @ 100
// SELL 10 @ 101

// Naya order:

// BUY 8 @ 101

// ye hoga 
// 5 @ 100 fill
// 3 @ 101 fill

import type { OrderBook } from "../orderbook/orderbook";
import type { TradeEvent, Side } from "../events";
import type { Decimal } from "../decimal";


export interface TakerOrder {
    orderId : string;
    userId : string;
    symbol  :string;
    side : Side
    price : Decimal| null;
    qty : Decimal;
    seq : bigint;
    timestamp : number;
}

export interface MathcResult {
    trade : TradeEvent[];
    filledQty : Decimal;
    leftoverQty : Decimal;
}

