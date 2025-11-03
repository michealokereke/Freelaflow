import { DateTime } from "luxon";
import { prisma } from "../../db/prisma.js";
import { errorFormat } from "../../utils/errorFormat.js";

const taskService = {
  updateTask: async (payload: {
    org: string;
    id: string | undefined;
    title: string;
    description: string;
    assigneeId: string;
    estimateMins: number;
    status: "OPEN" | "IN_PROGRESS" | "REVIEW" | "DONE" | "BLOCKED";
  }) => {
    const { org, id, title, description, assigneeId, estimateMins, status } =
      payload;

    if (!id) throw errorFormat("Invalid task id", 400);

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        assigneeId,
        estimateMins,
        status,
      },
    });

    return task;
  },

  deleteTask: async (id: string | undefined) => {
    const now = DateTime.utc().toJSDate();

    if (!id) throw errorFormat("Invalid task id", 400);

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        deletedAt: now,
      },
    });

    return task;
  },
};

export default taskService;
