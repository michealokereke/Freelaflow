import type { RequestHandler } from "express";
import { requestQueryStringer } from "../../utils/requestQueryStringer.js";
import type { AuthUser } from "../../middleware/auth.middleware.js";
import { projectsService } from "./project.service.js";

//////////////////////////////////////////////////////////////////////////// GET CLIeNTs CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const getProjects: RequestHandler = async (req: AuthUser, res, next) => {
  const {
    clientId = "",
    status = "",
    page = "",
    limit = "",
    q = "",
  } = requestQueryStringer(req, ["clientId", "page", "limit", "status", "q"]);
  const { org } = req.user;

  const { projects, totalProject } = await projectsService.getProjects({
    clientId,
    status,
    page,
    limit,
    q,
    org,
  });

  res.status(200).json({
    message: "Here are the list if your Projects",
    projects,
    totalProject,
  });
};

//////////////////////////////////////////////////////////////////////////// GET CLIeNT CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const getProject: RequestHandler = async (req: AuthUser, res, next) => {
  const { org } = req.user;
  const { id } = req.params;
  const project = await projectsService.getProject({ id, org });

  res.status(200).json({
    message: "Project found successfully",
    project,
  });
};

//////////////////////////////////////////////////////////////////////////// GET CLIeNT CONTROLLER  //////////////////////////////////////////////////////////////////////////////
export const createProject: RequestHandler = async (
  req: AuthUser,
  res,
  next
) => {
  const { org } = req.user;
  const { name, description, clientId, status, budgetCents } = req.body;

  const project = await projectsService.createProject({
    org,
    name,
    description,
    clientId,
    status,
    budgetCents,
  });

  res.status(201).json({
    message: "Project created created successfully",
    project,
  });
};

//////////////////////////////////////////////////////////////////////////// UPDATE PROJECT CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const updateProject: RequestHandler = async (
  req: AuthUser,
  res,
  next
) => {
  const { org } = req.user;
  const { id } = req.params;
  const { name, description, clientId, status, budgetCents } = req.body;

  const client = await projectsService.updateProject({
    org,
    name,
    description,
    clientId,
    status,
    budgetCents,
    id,
  });

  res.status(201).json({
    message: "Project updated successfully",
    client,
  });
};

//////////////////////////////////////////////////////////////////////////// DELETE CLIeNT CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const deleteProject: RequestHandler = async (
  req: AuthUser,
  res,
  next
) => {
  const { org } = req.user;
  const { id } = req.params;

  const client = await projectsService.deleteProject({ org, id });

  res.status(201).json({
    message: "Client deleted  successfully",
    client,
  });
};

//////////////////////////////////////////////////////////////////////////// CREATE TASK CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const createTask: RequestHandler = async (req: AuthUser, res, next) => {
  const { org } = req.user;
  const { id } = req.params;
  const { title, description, assigneeId, estimateMins } = req.body;

  const task = await projectsService.createTask({
    id,
    org,
    title,
    description,
    assigneeId,
    estimateMins,
  });

  res.status(201).json({
    message: "task created successfully",
    task,
  });
};

//////////////////////////////////////////////////////////////////////////// CREATE TASK CONTROLLER  //////////////////////////////////////////////////////////////////////////////
