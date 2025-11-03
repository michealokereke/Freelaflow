import z from "zod";

export const createTaskShema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  assigneeId: z.string().uuid().optional(),
  estimateMins: z.number().int().optional(),
});

export const updateTaskSchema = createTaskShema.extend({
  status: z
    .enum(["OPEN", "IN_PROGRESS", "REVIEW", "DONE", "BLOCKED"])
    .optional(),
});
