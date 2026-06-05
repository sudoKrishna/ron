export type Timestamp = number;
export type Sequence = number;

export type Side = "BUY" | "SELL";

export interface BaseEvent {
    type : string;
    seq : Sequence;
    timestamp : Timestamp
}

export interface OrderAcceptedEvent extends BaseEvent {
    type : "ACCEPTED";

    orderId : string
    symbol : string;


}

export interface TradeEvent extends BaseEvent {
    type : "TRADE";
    symbol :string;
    price :  number ;
    quantity : number;
    takerOrderId : string;
    makerOrderId : string;

    takerSide : Side;
}


export interface OrderCancelEvent extends BaseEvent {
    type : "ORDER_CANCELLED";

    orderId :string;
    symbol : string;
}

export interface OrderRejectedEvent extends BaseEvent {
    type  : "ORDER_REJECTED";

    orderId : string;
    symbol : string
    reason : string
}

export type Event = 
| OrderAcceptedEvent
| TradeEvent
| OrderCancelEvent
| OrderRejectedEvent

