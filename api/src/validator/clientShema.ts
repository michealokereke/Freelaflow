import z from "zod";

export const clientsSchema = {
  create: z.object({
    name: z.string().min(1),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
  }),
};
