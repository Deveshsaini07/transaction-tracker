import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { getTransaction, getAll, signUp, login, logout, addTransaction, getUser } from "../controllers/index.js";
const userRouter = Router();
userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/logout', Auth, logout);
userRouter.get('/getAllTransactions', Auth, getAll);
userRouter.get('/getTransaction/:id', Auth, getTransaction);
userRouter.post('/addTransaction', Auth, addTransaction);
userRouter.get('/getUser', Auth, getUser);
export default userRouter;
//# sourceMappingURL=UserRouter.js.map