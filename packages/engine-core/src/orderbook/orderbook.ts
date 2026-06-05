// bid side 
// highest price first 
// how the highest price first?
//  how to addOrder to the orderbook


// import {Order , Symbol , Side} from "../state";
import type { Order , Symbol ,Side } from "../state";

export interface OrderBook {
    symbol : Symbol;
    bids : Order[];
    asks : Order[];
}

export function createOrderBook(symbol : Symbol) : OrderBook {
    return {
        symbol,
        bids : [],
        asks : [],
    }
}

export function addOrder(book : OrderBook , order : Order) : void {
    if(order.side === "BUY") {
        insertBid(book.bids ,order);
    } else {
        insertAsks(book.asks, order)
    }
}

export function removeOrder(book : OrderBook , orderId : string) : boolean {
    const bidIndex = book.bids.findIndex((o) => o.orderId === orderId);
    if(bidIndex !== -1) {
        book.bids.splice(bidIndex , 1); // bsdimnlkh (startindex, deletecount)
        return true
    }

    const askIndex = book.asks.findIndex((o) => o.orderId === orderId);
    if(askIndex !== -1) {
        book.asks.splice(askIndex , 1);
        return true
    }
    return false
}

export function bestBid(book :OrderBook) : Order | undefined {
    return book.bids[0];
}
export function bestAsk(book : OrderBook) : Order | undefined {
    return book.asks[0];
}

function insertBid(bids : Order[] , order : Order) {
    let  i = 0;
    while(i < bids.length && bids[i]!.price >= order.price) {
        i++;
    }

    bids.splice(i , 0 , order);
}

function insertAsks(asks : Order[] , order : Order) {
    let i  = 0;
    while(i < asks.length && asks[i]!.price >= order.price){ 
        i++;
    }
}









