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

    private matchMarketSell(order : Order) : Trade[] {
        const trades : Trade[] = [];
        while(order.qty > 0 && this.orderBook.bids.length > 0) {
            const bestBids = this.orderBook.bids[0]!;
            const tradeQty = Math.min(order.qty , bestBids.qty);
            trades.push({
                buyOrderId : order.id,
                sellOrderId : bestBids.id,
                buyerUserId : order.userId,
                sellerUserId : bestBids.userId,
                price : bestBids.price!,
                qty : tradeQty,
            });
            order.qty -= tradeQty;
            bestBids.qty -= tradeQty;
            if(bestBids.qty === 0) {
                this.orderBook.asks.shift();
            }
        }
        return trades;
    }
    public processOrder(order : Order) : Trade[] {
        if(order.type === "LIMIT" && order.price === undefined) {
            throw new Error("limit orders must have a price");
        }

        if(order.type === "MARKET") {
            return order.side === "BUY"
            ? this.matchMarketBuy(order)
            : this.matchMarketSell(order);
        }
        return order.side === "BUY"
        ? this.matchBuy(order)
        : this.matchSell(order);
    }

    private mathcBuy(order : Order) : Trade[] {
        const trades : Trade[] =[];
        while (
            order.qty > 0 && this.orderBook.asks.length > 0 
            && order.price! >= this.orderBook.asks[0]!.price!
        ) {
            const bestAsk = this.orderBook.asks[0]!;
            const tradedQty = Math.min(order.qty, bestAsk.qty);
            const tradePrice = bestAsk.price!;
            trades.push({
                buyOrderId : order.id,
                sellOrderId : bestAsk.id,
                buyerUserId : order.userId,
                sellerUserId : bestAsk.userId,
                price : tradePrice,
                qty : tradedQty,
            });
            order.qty -= tradedQty;
            bestAsk.qty -= tradedQty;
            if(bestAsk.qty === 0) {
                this.orderBook.asks.shift();
            }
        }
        if(order.qty > 0) {
            this.insertBid(order);
        }
        return trades;
    }

    public cancelOrder(orderId : string): boolean {
        const bidIndex = this.orderBook.bids.findIndex(
            (order) => order.id === orderId
        );
        if(bidIndex !== -1) {
            this.orderBook.bids.splice(bidIndex, 1);
            return true;
        }
        const askIndex = this.orderBook.asks.findIndex(
            (order) => order.id === orderId
        );
        if(askIndex !== -1) {
            this.orderBook.asks.splice(askIndex, 1);
            return true;
        }
        return false;
    }


}