import { Router } from "express";
import { getTicketsTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter.get("/tickets/types", getTicketsTypes).get("/tickets").post("/tickets");

export { ticketsRouter };
