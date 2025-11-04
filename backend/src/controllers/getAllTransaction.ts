import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.js";

const prisma = new PrismaClient();

export async function getAll(req:AuthRequest,res:Response){
    try {
        const userId:number = req.userId;
        const data = await prisma.transaction.findMany({
            where:{
                userId:userId
            }
        });
        res.status(200).json({
            data,
            msg:"successfully got all transactions"
        })
    } catch (error) {
        res.status(500).json({
            msg:"error in getAll"
        });
    }
}