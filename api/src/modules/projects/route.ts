import { Router } from "express";
import { requestErrorCatcher } from "../../utils/generalErrorcatcher.js";
import schemaValidator from "../../middleware/schema.validator.js";
import {
  createProject,
  createTask,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "./project.controller.js";
import { projectsSchema } from "../../validator/projectsScheme.js";
import { createTaskShema } from "../../validator/taskSchema.js";

const projectRouter = Router();

projectRouter.get("/", requestErrorCatcher(getProjects));
projectRouter.get("/:id", requestErrorCatcher(getProject));
projectRouter.put(
  "/:id",
  schemaValidator(projectsSchema.create),
  requestErrorCatcher(updateProject)
);
projectRouter.delete("/:id", requestErrorCatcher(deleteProject));
projectRouter.post(
  "/",
  schemaValidator(projectsSchema.create),
  requestErrorCatcher(createProject)
);

projectRouter.post(
  "/:id/tasks",
  schemaValidator(createTaskShema),
  requestErrorCatcher(createTask)
);

export default projectRouter;
