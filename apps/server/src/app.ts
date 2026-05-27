import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth";
import marketRoutes from "./routes/marketRoutes";
import orderRoutes from "./routes/order";

import { startMarketDataService } from "./services/marketDataService";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/market", marketRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Exchange API running",
  });
});

startMarketDataService();

export default app;