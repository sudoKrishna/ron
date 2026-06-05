"use client";
import OrderBook from "../../component/trade/OrderBook";
import OrderForm from "../../component/trade/OrderForm";
import Trades from "../../component/trade/Trade";

export default function TradeScreen() {
    return (
        <div className="h-screen bg-[#090B14] text-white">
      <div className="grid grid-cols-12 gap-2 p-2 h-full">

       
        <div className="col-span-7 rounded-xl bg-[#11141f]">
          Chart
        </div>

   
        <div className="col-span-3 rounded-xl bg-[#11141f]">
          <OrderBook
       asks={[
         { price: 70215.7, size: 1.49, total: 6.54 },
         { price: 70214.4, size: 1.49, total: 5.05 },
        ]}
       bids={[
          { price: 70210.6, size: 2.69, total: 2.69 },
          { price: 70210.5, size: 0.01, total: 2.70 },
          ]}
       lastPrice={70202.8}
        />
        </div>

    
        <div className="col-span-2 rounded-xl bg-[#11141f]">
          <OrderForm />
        </div>

      </div>
    </div>
    )
}