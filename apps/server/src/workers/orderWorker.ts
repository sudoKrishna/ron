import { Worker } from "bullmq";
import {prisma} from "@repo/db";
import { redisConnection } from "../config/redis";

import {PositionService} from "../services/positionService";
import { TradeEngin } from "../services/tradeEngine";

const engine = new TradeEngin();
const positionService = new PositionService();

const orderWorker = new Worker("orderQueue" ,  async(job) => {
    const {userId , order} = job.data;

    await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
            where :  {userId},
            include : {collateral : true},
        });

        if(!user?.collateral) {
            throw new Error("collateral not found");
        }

        const collateral = user.collateral;

        if(collateral.available < order.margin) {
            throw new Error("Insufficient collateral");
        }

        await tx.collateral.update({
            where : {id : collateral.id},
            data : {
                available : collateral.available - order.margin,
                locked : collateral.locked + order.margin,
            },
        });
    })
})
