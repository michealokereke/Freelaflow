import { DateTime } from "luxon";
import { prisma } from "../../db/prisma.js";
import { errorFormat } from "../../utils/errorFormat.js";
import { parsePositiveInt } from "../../utils/parsePositiveInt.js";

export const clientService = {
  //////////////////////////////////////////////////////////////////////////// GET CLIRNTS SERVICE  //////////////////////////////////////////////////////////////////////////////

  getClients: async (payload: {
    q: string;
    page: string;
    limit: string;
    archived: string;
    org: string;
  }) => {
    const { q, page, limit, archived, org } = payload;
    const query = q.trim();
    const pageNum = parsePositiveInt(page, 1);
    const limitNum = parsePositiveInt(limit, 10);
    const archivedState = Boolean(archived) || false;

    const [clients, totalClients] = await prisma.$transaction([
      prisma.client.findMany({
        where: {
          organizationId: org,
          deletedAt: null,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },

        take: limitNum,
        skip: (pageNum - 1) * limitNum,
        select: {
          email: true,
          name: true,
          id: true,
          createdAt: true,
          _count: { select: { projects: true } },
        },
      }),

      prisma.client.count({
        where: {
          organizationId: org,
          deletedAt: null,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
      }),
    ]);

    return { clients, totalClients };
  },

  //////////////////////////////////////////////////////////////////////////// GET CLIRNT SERVICE  //////////////////////////////////////////////////////////////////////////////

  getClient: async (payload: { id: string | undefined; org: string }) => {
    const { id, org } = payload;
    if (!id) throw errorFormat("client id required", 400);

    const client = await prisma.client.findUnique({
      where: {
        id,
        organizationId: org,
        deletedAt: null,
      },
    });

    if (!client) throw errorFormat("no client found", 404);

    return client;
  },

  //////////////////////////////////////////////////////////////////////////// CREATE CLIRNTS SERVICE  //////////////////////////////////////////////////////////////////////////////

  createClient: async (payload: {
    org: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    metadata: Record<string, any>;
  }) => {
    const { org, name, email, phone, address, metadata } = payload;

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        address,
        metadata,
        organizationId: org,
      },
    });
    if (!client) throw errorFormat("wasn't able to create client", 400);

    return client;
  },

  //////////////////////////////////////////////////////////////////////////// UPDATE CLIeNT SERVICE  //////////////////////////////////////////////////////////////////////////////

  updateClient: async (payload: {
    org: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    metadata: Record<string, any>;
    id: string | undefined;
  }) => {
    const { org, name, email, phone, address, metadata, id } = payload;
    if (!id) throw errorFormat("client id required", 400);

    const client = await prisma.client.update({
      where: {
        organizationId: org,
        id,
      },
      data: {
        name,
        email,
        phone,
        address,
        metadata,
      },
    });
    if (!client)
      throw errorFormat(
        "wasn't able to update client or client doesnt exist",
        400
      );

    return client;
  },

  //////////////////////////////////////////////////////////////////////////// DELETE CLIeNT SERVICE  //////////////////////////////////////////////////////////////////////////////

  deleteClient: async (payload: {
    org: string;

    id: string | undefined;
  }) => {
    const { org, id } = payload;
    const now = DateTime.utc().toJSDate();

    if (!id) throw errorFormat("client id required", 400);

    const client = await prisma.client.update({
      where: {
        id,
        organizationId: org,
      },
      data: {
        deletedAt: now,
      },
    });
    if (!client)
      throw errorFormat(
        "wasn't able to delete client or client doesnt exist",
        400
      );

    return client;
  },
};
