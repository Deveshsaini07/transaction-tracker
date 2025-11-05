import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from "express";
import {z} from 'zod';

export interface AuthRequest extends Request{
    userId:number
}

const inputSchema = z.string().min(6);



export function Auth(req:AuthRequest,res:Response,next:NextFunction){
    try {
        const check = inputSchema.safeParse(req.headers.cookie);
        if(check.success == false){
            res.status(400).json({
                msg:"invalid token"
            });
            return;
        }
        const fullToken = req.headers.cookie;
        
        if(!fullToken){
            res.status(403).json({
                msg:"un-authorized"
            });
            return;
        }
        const token:string = fullToken.slice(6);
        // console.log(token);
        
        const data = jwt.verify(token,process.env.JWT_SECRET as string) as {id:number};
        // console.log(data);
        
        req.userId = data.id;
        next();
    } catch (error) {
        res.status(403).json({
            msg:"invalid token"
        });
        return;
    }
    
};