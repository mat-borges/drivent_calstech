import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketsTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const userTickets = await ticketsService.getUserTickets(req.userId);
    if (userTickets.length === 0) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.OK).send(userTickets);
    }
  } catch (error) {
    if (error.name === "NotDoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
    }
  }
}
