import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.js";

const prisma = new PrismaClient();

export async function getTransaction(req:AuthRequest,res:Response){
    try {
        let inputId = req.params.id;
        if(!inputId){
            res.status(404).json({
                msg:"transaction not found"
            });
            return;
        }
        const id = parseInt(inputId);
        const userId:number = req.userId;
        const data = await prisma.transaction.findUnique({
            where:{
                id:id
            }
        });
        res.status(200).json({
            data,
            msg:"successfully got particular transactions"
        })
    } catch (error) {
        res.status(500).json({
            msg:"error in getTransaction"
        });
    }
}