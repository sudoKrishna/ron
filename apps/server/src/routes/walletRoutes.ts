import { Router } from "express";
import { depositController, getBalane, withdrawController } from "../contollers/walletController";

const router = Router();

router.get("/:userId", getBalane);
router.post("/deposit" , depositController)
router.post("/withdraw", withdrawController)

export default router;