export type Timestamp = number;
export type Sequence = number ;

export type Side = "BUY" | "SELL";

export interface BaseCommand  {
type :string;
seq : Sequence;
timestamp : Timestamp
}

export interface PlaceOrderCommand extends BaseCommand {
    type : "PLACE_ORDER";

    orderId : string,
    symbol : string,
    side : Side ;
    price : number ;
    quantity : number;
}

export interface CancelOrderCommand extends BaseCommand {

    type : "CANCEL_ORDER";

    orderId : string,
    symbol : string,
}

export type Command = 
| PlaceOrderCommand
| CancelOrderCommand