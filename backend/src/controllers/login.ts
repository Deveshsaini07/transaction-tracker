import type { AuthRequest } from "../middlewares/auth.js";
import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


export async function login(req:AuthRequest,res:Response){
    try {
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
            httpOnly: true,       // ✅ JS cannot access the cookie
            secure: process.env.NODE_ENV === "production", // ✅ only https in prod
            sameSite: "strict",   // ✅ prevents CSRF
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