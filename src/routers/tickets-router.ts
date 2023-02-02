import { authenticateToken, validateBody } from "@/middlewares";
import { createUserTicket, getTicketsTypes, getUserTickets } from "@/controllers";

import { Router } from "express";
import { ticketSchema } from "@/schemas/tickets-schema";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getUserTickets)
  .post("/", validateBody(ticketSchema), createUserTicket);

export { ticketsRouter };
