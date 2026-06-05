import { redisConnection } from "../config/redis";

type Position = {
    userId :number;
    market : string;
    size : number ;
    entryPrice : number;
    margin : number;
}

const LIQUIDATION_THRESHOLD = 0.5;

const getAllPosition = async () : Promise<Position[]> => {
    const keys = await redisConnection.keys("position:*");

    const positions : Position[] = [];

    for(const key of keys) {
        const raw = await redisConnection.get(key)
        if(!raw) continue;
        positions.push(JSON.parse(raw));
    }
    return positions;
}

const getUnrealizePnl = (
    pos : Position,
    markPrice : number,
) => {
    return (markPrice - pos.entryPrice) * pos.size;
};

const liquidatePosition = async(pos : Position) => {
       console.log(`LIQUIDATING user=${pos.userId} market=${pos.market}`);

       await redisConnection.del(
        `position:${pos.userId}:${pos.market}`
       )

       await redisConnection.lpush(
        "Liquidations",
        JSON.stringify({
            ...pos,
            timestamp : Date.now()
        })
    )
}

export const runLiquidationEngin = async () => {
   try {
     const position = await getAllPosition();
 
     for(const pos of position) {
         const price = await redisConnection.get(
             `price:${pos.market}`
         );
 
         if(!price) continue;
 
         const markPrice = Number(price);
 
         const pnl = getUnrealizePnl(pos , markPrice);
 
         const equity = pos.margin + pnl;
         const positionValue  = Math.abs(
             pos.size * markPrice
         )
 
         const marginRatio = equity / positionValue;
 
         console.log(`[LIQ] ${pos.market} user=${pos.userId} ratio=${marginRatio.toFixed(4)}`)
 
         if(marginRatio < LIQUIDATION_THRESHOLD) {
             await liquidatePosition(pos)
         }
     }
 
   } catch (err : any) {
    console.error("Liqudation engine error:", err)
   }

}