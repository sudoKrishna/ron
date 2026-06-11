import type { TakerOrder } from "./match";
import type  {MatchableBook} from "./match";
import { match , } from "./match";
import {lte ,gte, add} from "../decimal";
import type { TradeEvent } from "../events";


// what the funk is this postonly order ?
// postonly order means onlyadd me to the order book never take liqudity immditely;
// 
export type PostOnlyResult = 
|  {status : "REJECTED" , reason : "POST_ONLY_WOULD_TAKE"}
| {status : "REST_AS_MAKER"}

export function handlePostOnly(
  book : MatchableBook,
  order : TakerOrder
) : PostOnlyResult {
const bestOpposite = book.bestOpposite(order.side);

if(!bestOpposite) {
    return {status : "REST_AS_MAKER"}
}

const crosses  = 
order.price !== null &&
(order.side === "BUY" 
    ? lte(bestOpposite.price, order.price)
    : gte(bestOpposite.price , order.price));

    if(crosses) {
        return {
            status : "REJECTED",
            reason : "POST_ONLY_WOULD_TAKE"
        }
    }
 return {status: "REST_AS_MAKER"}
}
// fill order kill kya karta hai ?(FOK)
//  ya to pura fill karo ya kill karo
// ya to kuch mat karo 
// 

export type FokResult = 
| {
    status : "FILED";
    trade : TradeEvent[];

}
| {status : "REJECTED" , reason : "FOK_NOT_FULLY_FILLABLE"};


export function handleFOK(
  book: MatchableBook,
  order: TakerOrder
): FokResult {
  let available = 0n;

  const level = book.bestOpposite(order.side);

  if (!level) {
    return {
      status: "REJECTED",
      reason: "FOK_NOT_FULLY_FILLABLE",
    };
  }

  if (order.price !== null) {
    const crosses =
      order.side === "BUY"
        ? lte(level.price, order.price)
        : gte(level.price, order.price);

    if (!crosses) {
      return {
        status: "REJECTED",
        reason: "FOK_NOT_FULLY_FILLABLE",
      };
    }
  }

  for (const resting of level.orders) {
    available = add(available, resting.qty);

    if (available >= order.qty) {
      break;
    }
  }

  if (available < order.qty) {
    return {
      status: "REJECTED",
      reason: "FOK_NOT_FULLY_FILLABLE",
    };
  }

  const result = match(book, order);

  return {
    status: "FILED",
    trade: result.trades,
  };
}

// aar ya par imadete or cancel

export type IocResult = 
| {status : "FILED" , trade : TradeEvent[] }
| {status : "LEFTOVER" ,reason : "OTHER_SIDE_NOT_MATCH"}
| {stauts : "CANCEL" , trade : TradeEvent[] , leftoverQty : bigint, reason : "ONLY_THIS_CAN_FILLED"}

export function handleIOC (
    book : MatchableBook,
    order : TakerOrder
) : IocResult {
   const result = match(book , order);

  if(result.leftoverQty > 0n) {
    return {
        stauts : "CANCEL",
        trade : result.trades,
        leftoverQty : result.leftoverQty,
        reason : "ONLY_THIS_CAN_FILLED"
    }
  };
  return {
    status : "FILED",
    trade : result.trades
  }
}
// isbadve to aabi trade karna hai 
// vo bi best price se 

export type MarketResult = 
| {status : "FILLED" , trade : TradeEvent[]}
| {status :  "PARTIAL" ,leftoverQty : bigint , trade : TradeEvent[]}
| {status : "CANCEL" ,  reason : "ORDER_CANCEL"}


export function handleMarket (
    book : MatchableBook,
    order : TakerOrder
) : MarketResult {
    if(order.price !== null) {
        throw new Error("Market orders must use price ")
    }

    const result = match(book , order);

    if(result.trades.length === 0) {
      return {
        status : "CANCEL", reason : "ORDER_CANCEL"
      };
    }

    if(result.leftoverQty > 0n) {
      return {
        status : "PARTIAL",
        trade  : result.trades,
        leftoverQty : result.leftoverQty,
      };
    }

    return {
        status : "FILLED",
        trade : result.trades
    }
}

// splippage mtlb kabi kabi orderbook thin hoti hai 
// like 10 , 20 , 30 fir 300 so if some one
// come 4 qty leni hai to 10 20 30 fir 300 nahi jana chaiye nahi to usko gata ho jaye ga to 
// sloppage lagate hai 
export type SlippageResult =
| {status : "FILLED" , trade : TradeEvent[]}
| {status :  "PARTIAL" ,leftoverQty : bigint , trade : TradeEvent[]}
| {status : "REJECTED" , reason : "NO_LIQIDITY"}
| {status : "REJECTED" , reason : "SLIPPAGE_EXCEEDED"}

export function handleSlippage (
    book : MatchableBook,
    order : TakerOrder,
    sippagePercent  = 5n
) : SlippageResult {
    if(order.price !== null) { 
        throw new Error("order does not have pirce=null")
    }

    const bestLevel = book.bestOpposite(order.side);


    if(!bestLevel) {
        return {
            status : "REJECTED",
            reason : "NO_LIQIDITY"
        }
    }

    let protectedPrice : bigint;


    if(order.side ===  "BUY") {
        protectedPrice= (bestLevel.price * (100n + sippagePercent)) / 100n;
    } else {
        protectedPrice = (bestLevel.price * (100n - sippagePercent)) / 100n;
    }

    const protectedOrder : TakerOrder = {
        ...order,
        price : protectedPrice
    }

    const result = match(book , protectedOrder)
    if(result.trades.length === 0) {
        return {
            status : "REJECTED",
            reason : "SLIPPAGE_EXCEEDED"
        }
    }

      if (result.leftoverQty > 0n) {
    return {
      status: "PARTIAL",
      trade: result.trades,
      leftoverQty: result.leftoverQty,
    };
  }
   return {
    status :  "FILLED",
    trade : result.trades
   }
 }
// gtc good till end 

 export type GtcResult = 
 | {status : "FILLED" ,trade : TradeEvent[]}
 | {status : "PARTIALLY_FILLED_RESTED" , trade : TradeEvent[] , leftoverQty : bigint}


 export function handleGTC(
    book : MatchableBook,
    order : TakerOrder
 ) : GtcResult {
    const result = match(book , order)

    if(result.leftoverQty > 0n) {
       return {
        status : "PARTIALLY_FILLED_RESTED",
        trade : result.trades,
        leftoverQty : result.leftoverQty
       };
        };
         return {
        status : "FILLED",
        trade : result.trades,
    }
}

