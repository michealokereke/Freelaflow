import { DateTime } from "luxon";
import { prisma } from "../../db/prisma.js";
import { errorFormat } from "../../utils/errorFormat.js";
import { parsePositiveInt } from "../../utils/parsePositiveInt.js";

export const projectsService = {
  //////////////////////////////////////////////////////////////////////////// GET CLIRNTS SERVICE  //////////////////////////////////////////////////////////////////////////////

  getProjects: async (payload: {
    q: string;
    page: string;
    limit: string;
    clientId: string;
    status: string;
    org: string;
  }) => {
    const { clientId, status, page, limit, q, org } = payload;
    const pageNum = parsePositiveInt(page, 1);
    const limitNum = parsePositiveInt(limit, 10);
    const query = q.trim();

    const [projects, totalProject] = await prisma.$transaction([
      prisma.project.findMany({
        where: {
          organizationId: org,
          deletedAt: null,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],

          ...(clientId && clientId.trim() ? { clientId } : {}),
        },
        take: limitNum,
        skip: (pageNum - 1) * limitNum,
        orderBy: { updatedAt: "desc" },
      }),

      prisma.project.count({
        where: {
          organizationId: org,
          deletedAt: null,
          ...(clientId && clientId.trim() ? { clientId } : {}),
        },
      }),
    ]);

    return { projects, totalProject };
  },

  //////////////////////////////////////////////////////////////////////////// GET PROJECT SERVICE  //////////////////////////////////////////////////////////////////////////////

  getProject: async (payload: { id: string | undefined; org: string }) => {
    const { id, org } = payload;
    if (!id) throw errorFormat("project id required", 400);

    const project = await prisma.project.findUnique({
      where: {
        id,
        organizationId: org,
        deletedAt: null,
      },
      include: {
        tasks: { where: { deletedAt: null } },
      },
    });

    if (!project) throw errorFormat("no client found", 404);

    return project;
  },

  //////////////////////////////////////////////////////////////////////////// CREATE PROJECT SERVICE  //////////////////////////////////////////////////////////////////////////////

  createProject: async (payload: {
    org: string;
    name: string;
    status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
    description: string;
    budgetCents: number;
    clientId: string;
  }) => {
    const { org, name, description, clientId, status, budgetCents } = payload;

    const project = await prisma.$transaction(async (tx) => {
      const client = await tx.client.findUnique({
        where: {
          organizationId: org,
          id: clientId,
        },
      });

      if (!client)
        throw errorFormat("client doesnt belong to this organization", 400);

      const project = await tx.project.create({
        data: {
          name,
          description,
          clientId,
          status,

          //add budgetcents
          organizationId: org,
        },
      });
      if (!project) throw errorFormat("wasn't able to create project", 400);

      return project;
    });

    return project;
  },

  //////////////////////////////////////////////////////////////////////////// UPDATE CLIeNT SERVICE  //////////////////////////////////////////////////////////////////////////////

  updateProject: async (payload: {
    org: string;
    name: string;
    status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
    description: string;
    budgetCents: number;
    clientId: string;
    id: string | undefined;
  }) => {
    const { org, name, description, clientId, status, budgetCents, id } =
      payload;
    if (!id) throw errorFormat("Project id required", 400);

    const project = await prisma.project.update({
      where: {
        organizationId: org,
        id,
        clientId,
      },
      data: {
        name,
        description,
        //add budgetcents
        status,
      },
    });
    if (!project)
      throw errorFormat(
        "wasn't able to update project or project doesnt exist",
        400
      );

    return project;
  },

  //////////////////////////////////////////////////////////////////////////// DELETE PROJECT SERVICE  //////////////////////////////////////////////////////////////////////////////

  deleteProject: async (payload: { org: string; id: string | undefined }) => {
    const { org, id } = payload;
    const now = DateTime.utc().toJSDate();

    if (!id) throw errorFormat("projrct id required", 400);

    const project = await prisma.project.update({
      where: {
        id,
        organizationId: org,
      },
      data: {
        deletedAt: now,
      },
    });
    if (!project)
      throw errorFormat(
        "wasn't able to delete project or project doesnt exist",
        400
      );

    return project;
  },

  createTask: async (payload: {
    title: string;
    description: string;
    assigneeId: string;
    estimateMins: number;
    org: string;
    id: string | undefined;
  }) => {
    const { id, org, title, description, assigneeId, estimateMins } = payload;

    if (!id || !id?.trim()) throw errorFormat("invalid project id", 400);

    const task = await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.findUnique({
        where: {
          id: org,

          ...(!assigneeId
            ? {}
            : {
                users: {
                  some: {
                    id: assigneeId,
                  },
                },
              }),
        },
      });

      if (!organization)
        throw errorFormat(" user not in this organization ", 404);

      const task = await tx.task.create({
        data: {
          projectId: id,
          title,
          ...(description && description.trim() ? { description } : {}),
          ...(estimateMins ? { estimateMins } : {}),
        },
      });

      return task;
    });

    return task;
  },
};
