import express from "express";
import { placeOrder, cancelExOrder } from "../contollers/orderController";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router();

router.post("/",authMiddleware, placeOrder);
router.delete("/:id", authMiddleware ,cancelExOrder );

export default router;