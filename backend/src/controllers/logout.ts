import type { AuthRequest } from "../middlewares/auth.js";
import type { Response } from "express";


export function logout(req:AuthRequest,res:Response){
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });
    } catch (error) {
        res.status(500).json({
            msg:"error in logout"
        });
    }
}