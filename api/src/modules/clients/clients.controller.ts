import type { RequestHandler } from "express";
import { clientService } from "./client.service.js";
import { requestQueryStringer } from "../../utils/requestQueryStringer.js";
import type { AuthUser } from "../../middleware/auth.middleware.js";

//////////////////////////////////////////////////////////////////////////// GET CLIeNTs CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const getClients: RequestHandler = async (req: AuthUser, res, next) => {
  const {
    q = "",
    page = "",
    limit = "",
    archived = "",
  } = requestQueryStringer(req, ["q", "page", "limit", "archived"]);
  const { org } = req.user;

  const { clients, totalClients } = await clientService.getClients({
    q,
    page,
    limit,
    archived,
    org,
  });

  res.status(200).json({
    message: "Here are the list if your clients",
    clients,
    totalClients,
  });
};

//////////////////////////////////////////////////////////////////////////// GET CLIeNT CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const getClient: RequestHandler = async (req: AuthUser, res, next) => {
  const { org } = req.user;
  const { id } = req.params;
  const client = await clientService.getClient({ id, org });

  res.status(200).json({
    message: "client found successfully",
    client,
  });
};

//////////////////////////////////////////////////////////////////////////// GET CLIeNT CONTROLLER  //////////////////////////////////////////////////////////////////////////////
export const createClient: RequestHandler = async (
  req: AuthUser,
  res,
  next
) => {
  const { org } = req.user;
  const { name, email, phone, address, metadata } = req.body;

  const client = await clientService.createClient({
    org,
    name,
    email,
    phone,
    address,
    metadata,
  });

  res.status(201).json({
    message: "Client created successfully",
    client,
  });
};

//////////////////////////////////////////////////////////////////////////// UPDATE CLIeNT CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const updateClient: RequestHandler = async (
  req: AuthUser,
  res,
  next
) => {
  const { org } = req.user;
  const { id } = req.params;
  const { name, email, phone, address, metadata } = req.body;

  const client = await clientService.updateClient({
    org,
    name,
    email,
    phone,
    address,
    metadata,
    id,
  });

  res.status(201).json({
    message: "Client updated successfully",
    client,
  });
};

//////////////////////////////////////////////////////////////////////////// DELETE CLIeNT CONTROLLER  //////////////////////////////////////////////////////////////////////////////
export const deleteClient: RequestHandler = async (
  req: AuthUser,
  res,
  next
) => {
  const { org } = req.user;
  const { id } = req.params;

  const client = await clientService.deleteClient({ org, id });

  res.status(201).json({
    message: "Client deleted  successfully",
    client,
  });
};
