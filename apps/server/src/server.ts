import http from "http";
import app from "./app";
import SoketServer from "./socket/socket.server";

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

new SoketServer(server);

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})