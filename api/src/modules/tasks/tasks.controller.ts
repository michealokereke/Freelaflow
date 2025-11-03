import type { RequestHandler } from "express";
import type { AuthUser } from "../../middleware/auth.middleware.js";
import taskService from "./task.service.js";

export const updateTask: RequestHandler = async (req: AuthUser, res, next) => {
  const { org } = req.user;
  const { id } = req.params;
  const { title, description, assigneeId, estimateMins, status } = req.body;

  const task = await taskService.updateTask({
    org,
    id,
    title,
    description,
    assigneeId,
    estimateMins,
    status,
  });

  res.json({ message: "Task updated Successfully", task });
};

export const deleteTask: RequestHandler = async (req: AuthUser, res, next) => {
  const { id } = req.params;

  const task = await taskService.deleteTask(id);

  res.json({ message: "Task deleted Successfully", task });
};
