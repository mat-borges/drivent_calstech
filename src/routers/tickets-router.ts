import { authenticateToken, validateBody } from "@/middlewares";
import { createUserTicket, getTicketsTypes, getUserTickets } from "@/controllers/tickets-controller";

import { Router } from "express";
import { ticketSchema } from "@/schemas/tickets-schema";

const ticketsRouter = Router();

ticketsRouter
  .use(authenticateToken)
  .get("/tickets/types", getTicketsTypes)
  .get("/tickets", getUserTickets)
  .post("/tickets", validateBody(ticketSchema), createUserTicket);

export { ticketsRouter };
