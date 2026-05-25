type Side = "BUY" | "SELL";
type OrderType = "LIMIT" | "MARKET";

export type Order = {
    id : string;
    userId : number;
    price? : number;
    market  :string;
    qty : number;
    side : Side;
    type : OrderType;
    createdAt : number;
}

type OrderBook = {
    bids : Order[];
    asks : Order[];
}

type Trade = {
    buyOrderId : string;
    sellOrderId : string;
    buyerUserId : number;
    sellerUserId : number;
    price : number;
    qty :number;
};

export class TradeEngin {
    private orderBook: OrderBook = {
        bids : [],
        asks : [],
    };

    public getOrderBook() {
        return this.orderBook;
    }

    private matchMarketBuy(order : Order) : Trade[] {
        const trades : Trade[] = [];
        while(order.qty > 0 && this.orderBook.asks.length > 0) {
            const bestAsk = this.orderBook.asks[0]!;
            const tradedQty = Math.min(order.qty , bestAsk.qty);
            trades.push({
                buyOrderId : order.id,
                sellOrderId : bestAsk.id,
                buyerUserId : order.userId,
                sellerUserId : bestAsk.userId,
                price : bestAsk.price!,
                qty : tradedQty,
            });
            order.qty -= tradedQty;
            bestAsk.qty -= tradedQty;
            if(bestAsk.qty === 0) {
                this.orderBook.asks.shift();
            }
        }
        return trades;
    }

}