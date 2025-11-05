import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function getAll(req, res) {
    try {
        const userId = req.userId;
        const data = await prisma.transaction.findMany({
            where: {
                userId: userId
            }
        });
        res.status(200).json({
            data,
            msg: "successfully got all transactions"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "error in getAll"
        });
    }
}
//# sourceMappingURL=getAllTransaction.js.map