import { Router } from "express";
import { requestErrorCatcher } from "../../utils/generalErrorcatcher.js";
import schemaValidator from "../../middleware/schema.validator.js";
import { clientsSchema } from "../../validator/clientShema.js";
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} from "./clients.controller.js";

const clientRouter = Router();
clientRouter.get("/", requestErrorCatcher(getClients));
clientRouter.get("/:id", requestErrorCatcher(getClient));
clientRouter.put(
  "/:id",
  schemaValidator(clientsSchema.create),
  requestErrorCatcher(updateClient)
);
clientRouter.delete("/:id", requestErrorCatcher(deleteClient));
clientRouter.post(
  "/",
  schemaValidator(clientsSchema.create),
  requestErrorCatcher(createClient)
);
export default clientRouter;
