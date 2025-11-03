import { Router } from "express";
import { requestErrorCatcher } from "../../utils/generalErrorcatcher.js";
import { deleteTask, updateTask } from "./tasks.controller.js";
import schemaValidator from "../../middleware/schema.validator.js";
import { updateTaskSchema } from "../../validator/taskSchema.js";

const taskRouter = Router();

taskRouter.put(
  "/:id",
  schemaValidator(updateTaskSchema),
  requestErrorCatcher(updateTask)
);
taskRouter.delete("/:id", requestErrorCatcher(deleteTask));

export default taskRouter;
