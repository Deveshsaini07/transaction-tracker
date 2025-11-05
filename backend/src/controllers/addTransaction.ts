import type { AuthRequest } from "../middlewares/auth.js";
import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import {z} from "zod";

const prisma = new PrismaClient();

const inputSchema = z.object({
    name:z.string().min(1),
    upiId:z.string().min(1)
})


export async function addTransaction(req:AuthRequest,res:Response){
    try {
        const check = inputSchema.safeParse(req.body);
        if(check.success == false){
            res.status(400).json({
                msg:"invalid inputs (name,upiId)"
            });
            return;
        }
        const {name,upiId} = req.body;
        let amount =req.body.amount;
        let credited=true;
        if(amount<0){
            credited=false;
        }
        const userId = req.userId;
        const data = await prisma.transaction.create({
            data:{
            otherUser:name,
            amount:amount,
            credited:credited,
            upiId:upiId,
            userId:userId
        }});
        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                balance:{
                    increment:amount
                }
            }
        })
        res.status(200).json({
            data,
            msg:"successfully added the transactions"
        })
    } catch (error) {
        res.status(500).json({
            msg:"error in addTransaction"
        });
    }
}