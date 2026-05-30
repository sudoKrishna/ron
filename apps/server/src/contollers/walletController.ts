import type {Request , Response} from "express";
import {getBalance , deposit , withdraw} from "../services/walletService"

export const getBalane = async (req : Request , res : Response) => {
    try {
        const userId = req.params.userId as string;
        const balance = await getBalance(userId)

        res.status(200).json({
            success : true,
            data : balance 
        });
    } catch (error :any) {
        res.status(400).json({
            success: false ,
            message :  error.message
        })
    }
}

export const depositController = async (req : Request , res : Response) => {
    try {
        const {userId , amount }=  req.body;
        const wallet = await deposit(
            userId,
            Number(amount)
        );

        res.status(200).json({
            success : true,
            data : wallet
        });
    } catch (error: any) {
        res.status(400).json({
            success : false ,
            message  : error.message
        })
    }
}

export const withdrawController  =  async (req : Request , res : Response) => {
    try {
        const {userId , amount} = req.body;
        const wallet = await withdraw (
            userId,
            Number(amount)
        );

        res.status(200).json({success : true, data : wallet});
    } catch (error :any) {
        res.status(400).json({
            success : false,
            message : error.message 
        })
    }
}