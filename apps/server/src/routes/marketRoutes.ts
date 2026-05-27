import express from "express";
import {getPrice} from "../contollers/marketController";

const router = express.Router();

router.get(
    "/:symbol",
    getPrice
)

export default router;
