import { getTicketsTypes, getUserTickets } from "@/controllers/tickets-controller";

import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .use(authenticateToken)
  .get("/tickets/types", getTicketsTypes)
  .get("/tickets", getUserTickets)
  .post("/tickets");

export { ticketsRouter };
