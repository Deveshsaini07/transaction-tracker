import { PrismaClient } from '@prisma/client';
import type { Request,Response } from 'express'

const prisma = new PrismaClient

export async function getUser(req:Request,res:Response){
    try {
        const userId = req.userId;
        const data = await prisma.user.findUnique({
            where:{
                id:userId
            }
        });
        if(!data){
            res.status(404).json({
                msg:"counld find the user"
            });
        }
        else{
            res.status(200).json({
                data
            })
        }
    } catch (error) {
        res.status(500).json({
            msg:"error in getUser"
        })
    }
}
