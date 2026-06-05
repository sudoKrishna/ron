import WebSocket from "ws";
import { redisConnection} from "../config/redis";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/stream";

const SYMBOLS = [
    "btcusdt",
    "ethusdt",
    "solusdt",
    "bnbusdt",
]

const streams = SYMBOLS.map((symbol) => `${symbol}@trade`)
.join("/");

let socket : WebSocket;

export const startMarketDataService = () => {
    socket = new WebSocket(
        `${BINANCE_WS_URL}?streams=${streams}`
    );

    socket.on("open" ,() => {
        console.log("connected to Binance websocket");
    });

    socket.on("message" , async (data) => {
try {
            const parsedData = JSON.parse(
                data.toString()
            );
    
            const payload = parsedData.data;
    
            if (!payload) return ;
    
            const symbol = payload.s;
            const price = payload.p;
    
            if(!symbol || !price) return ;
    
            await redisConnection.set(
                `price:${symbol}`,
                price
            );
    
            await redisConnection.set(
                `price:${symbol.toLowerCase()}`,
                price
            );
    
            // console.log(
            //     `[MARKET] ${symbol}: ${price}`
            // )
} catch (error) {
    console.error(
        "market data processing error:",
        error
    );
}
    });

    socket.on("close", () => {
        console.log(
            "binance websocket disconnected"
        );

        reconnect();
    })
    socket.on("error", (error) => {
        console.error(
            "binamce websocket error:",
            error
        )
    })
};

const reconnect = () => {
    console.log(
        "reconnectiiing to Binance in 5 seconds..."
    );

    setTimeout(() => {
        startMarketDataService();
    }, 5000);
}

export const stopMarketDataService = () => {
    if(socket) {
        socket.close();
    }
}

export const getMarketPrice = async(
    market : string
) => {
    const price =  await redisConnection.get(
    `price:${market.toUpperCase()}`
    )

    if(!price) {
        throw new Error(
            `Price not found for ${market}`
        );
    }
    return Number(price);
}
