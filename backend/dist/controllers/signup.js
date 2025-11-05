import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
const prisma = new PrismaClient();
const inputSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
    balance: z.number()
});
export async function signUp(req, res) {
    try {
        const check = inputSchema.safeParse(req.body);
        if (check.success == false) {
            res.status(400).json({
                msg: "invalid inputs(username,password,balance)"
            });
            return;
        }
        const { username, password, balance } = req.body;
        const data = await prisma.user.create({
            data: {
                username: username,
                password: password,
                balance: balance
            }
        });
        if (!data) {
            res.status(500).json({
                msg: "couldnt create user profile"
            });
            return;
        }
        res.status(200).json({
            data,
            msg: "successfully added the user"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "error in signup"
        });
    }
}
//# sourceMappingURL=signup.js.map