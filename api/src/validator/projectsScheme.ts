import z from "zod";

export const projectsSchema = {
  create: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    clientId: z.string().uuid().optional(),
    status: z.enum(["ACTIVE", "ARCHIVED", "COMPLETED"]).optional(),
    budgetCents: z.number().int().optional(),
  }),
};
