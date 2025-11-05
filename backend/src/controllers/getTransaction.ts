import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.js";
import { z } from "zod";

const prisma = new PrismaClient();

const inputSchema = z.object({
  id: z.number().int().gt(0),
});

const paramSchema = z.object({
  id: z.string().regex(/^\d+$/, "id must be a positive integer"),
});

export async function getTransaction(req: AuthRequest, res: Response) {
  try {
    const parsed = paramSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        msg: "Invalid id parameter",
      });
    }

    const id = parseInt(parsed.data.id, 10);

    // Double-check integer validity (optional)
    inputSchema.parse({ id });

    const data = await prisma.transaction.findUnique({ where: { id } });

    if (!data) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.status(200).json({
      data,
      msg: "Successfully got transaction",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error in getTransaction",
      error: (error as Error).message,
    });
  }
}
