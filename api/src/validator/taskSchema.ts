import z from "zod";

export const createTaskShema = z.object({
  titls: z.string().min(2),
  description: z.string().optional(),
  assigneeId: z.string().uuid().optional(),
  estimateMins: z.number().int(),
});

export const updateTaskSchema = createTaskShema.extend({
  status: z
    .enum(["OPEN", "IN_PROGRESS", "REVIEW", "DONE", "BLOCKED"])
    .optional(),
});
