import type { AuthRequest } from "../middlewares/auth.js";
import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import jwt from "jsonwebtoken";
import {z} from "zod";

const prisma = new PrismaClient();

const inputSchema = z.object({
    username:z.string().min(1),
    password:z.string().min(1),
});


export async function login(req:AuthRequest,res:Response){
    try {
        const check = inputSchema.safeParse(req.body);
        if(check.success == false){
            res.status(400).json({
                msg:"invalid inputs(username,password)"
            });
            return;
        }
        const {username,password} = req.body;
        const data = await prisma.user.findUnique({
            where:{
                username:username,
                password:password
            }
        });
        if(!data){
            res.status(500).json({
                msg:"couldnt find user profile"
            });
            return;
        }
        const userId = data.id;
        const token = jwt.sign({id:userId},process.env.JWT_SECRET as string);
        res.cookie('token',token,{
            httpOnly: true,       // ✅ JS cannot access the cookie // ✅ only https in prod
            sameSite: "strict", 
            secure:true  // ✅ prevents CSRF
        })
        res.status(200).json({
            data,
            msg:"successfully logged in"
        })
    } catch (error) {
        res.status(500).json({
            msg:"error in login"
        });
    }
}