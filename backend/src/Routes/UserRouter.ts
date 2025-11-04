import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { getTransaction, getAll, signUp, login, logout, addTransaction } from "../controllers/index.js";

const userRouter = Router();

userRouter.post('/signup',signUp);
userRouter.get('/login',login);
userRouter.post('/logout',Auth,logout)
userRouter.get('/getAllTransactions',Auth,getAll);
userRouter.get('/getTransaction',Auth,getTransaction);
userRouter.post('/addTransaction',Auth,addTransaction);

export default userRouter;