import { PrismaClient } from "@prisma/client";
import { NODE_ENV } from "../utils/emv.js";
export const prisma = new PrismaClient({
  log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
