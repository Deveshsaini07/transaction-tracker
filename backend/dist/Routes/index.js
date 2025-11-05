import { Router } from "express";
import userRouter from "./UserRouter.js";
const router = Router();
router.use('/user', userRouter);
export default router;
//# sourceMappingURL=index.js.map