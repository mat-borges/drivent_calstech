import { authenticateToken, validateBody } from "@/middlewares";
import { createUserTicket, getTicketsTypes, getUserTickets } from "@/controllers/tickets-controller";

import { Router } from "express";
import { ticketSchema } from "@/schemas/tickets-schema";

const ticketsRouter = Router();

ticketsRouter
  .use("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getUserTickets)
  .post("/", validateBody(ticketSchema), createUserTicket);

export { ticketsRouter };
