import express from "express";
import {getPrice, getAllMarkets} from "../contollers/marketController";

const router = express.Router();

router.get("/", getAllMarkets);
router.get(
    "/:symbol",
    getPrice
)

export default router;
