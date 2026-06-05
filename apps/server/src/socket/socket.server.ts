import { WebSocketServer, type WebSocket } from "ws";
import http, { Server } from 'http'

export default class SoketServer {
    private sockets: WebSocket[] = [];
    private wss: WebSocketServer;

    constructor(server: Server) {
        this.wss = new WebSocketServer({server});
        this.init_connection();
    }

    private init_connection() {
        this.wss.on("connection", (socket: WebSocket, req) => {
            console.log("web socket server is started");
            socket.on('message', (data: any) => {
                console.log("message reciewed for this socket is : ", data.toString());
            })
        })
        this.wss.on("close", () => {
            console.log("web socket server is been closed");
        })
    }
}