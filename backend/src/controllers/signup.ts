import type { AuthRequest } from "../middlewares/auth.js";
import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// interface InputSchema{
//     otherName:string,
//     amount:number,
//     credited:boolean,
//     upiId:string
// }

export async function signUp(req:AuthRequest,res:Response){
    try {
        const {username,password,balance} = req.body;
        const data = await prisma.user.create({
            data:{
            username:username,
            password:password,
            balance:balance
        }});
        if(!data){
            res.status(500).json({
                msg:"couldnt create user profile"
            });
            return;
        }
        res.status(200).json({
            data,
            msg:"successfully added the user"
        })
    } catch (error) {
        res.status(500).json({
            msg:"error in signup"
        });
    }
}