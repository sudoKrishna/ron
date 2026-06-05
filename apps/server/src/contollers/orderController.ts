import type { Request , Response } from "express";
import { OrderService } from "../services/orderService";

const orderService = new OrderService();

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const result = await orderService.createOrder({
      ...req.body,
      userId
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const cancelExOrder = async(req : Request , res : Response) => {
   try {

    const {id} = req.params;

    if(!id || Array.isArray(id)) {
      return res.status(400).json({
        message : "invalid order id "
      })
    }
     const result = await orderService.cancelExistingOrder(id);
 
     return res.status(200).json(result);
   } catch (error : any) {
    return res.status(400).json({
        message : error.message
    })
   }
}