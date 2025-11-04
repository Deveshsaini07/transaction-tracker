import type { AuthRequest } from "../middlewares/auth.js";
import { PrismaClient } from "@prisma/client";
import type { Response } from "express";

const prisma = new PrismaClient();

// interface InputSchema{
//     otherName:string,
//     amount:number,
//     credited:boolean,
//     upiId:string
// }

export async function addTransaction(req:AuthRequest,res:Response){
    try {
        const {name,amount,credited,upiId} = req.body;
        const userId = req.userId;
        const data = await prisma.transaction.create({
            data:{
            otherUser:name,
            amount:amount,
            credited:credited,
            upiId:upiId,
            userId:userId
        }});
        res.status(200).json({
            data,
            msg:"successfully added the transactions"
        })
    } catch (error) {
        res.status(500).json({
            msg:"error in getAll"
        });
    }
}