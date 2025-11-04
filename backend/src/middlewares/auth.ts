import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request{
    userId:number
}

export function Auth(req:AuthRequest,res:Response,next:NextFunction){
    try {
        const fullToken = req.headers["authorization"];

        if(!fullToken){
            res.status(403).json({
                msg:"un-authorized"
            });
            return;
        }
        const token:string = fullToken;
        const data = jwt.verify(token,process.env.JWT_SECRET as string) as {id:number};
        req.userId = data.id;
        next();
    } catch (error) {
        res.status(403).json({
            msg:"invalid token"
        });
        return;
    }
    
};