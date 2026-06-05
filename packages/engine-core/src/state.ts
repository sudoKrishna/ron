export type OrderId = string;
export type Symbol = string;
export type UserId = string;
export type Timestamp = string;
export type Sequence = string;


export type Side = "BUY" | "SELL";

export interface Order {
    orderId : string;
    symbol :string;

    userId?  :UserId;
    side : Side ;
    price : number;
    quantity : number;
    remaining  : number;
    timestamp : Timestamp

}

export interface OrderBook {
    symbol : Symbol;
    
    bids : Order[];
    asks : Order[];
}

export interface EngineState {
    books : Record<Symbol , OrderBook>
    orders : Record<OrderId , Order>
}

export function createState() : EngineState { 
    return {
        books : {},
        orders : {},
    }
}


