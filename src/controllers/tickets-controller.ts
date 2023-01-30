import { Request, Response } from "express";

import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes(req: Request, res: Response) {
  try {
    const ticketTypes = ticketsService.getTicketsTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}
