import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import { notFoundError } from "@/errors";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketsTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const userTickets = await ticketsService.getUserTickets(req.userId);

    if (!userTickets) {
      throw notFoundError();
    } else {
      return res.status(httpStatus.OK).send(userTickets);
    }
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export async function createUserTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as { ticketTypeId: number };

  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const ticket = await ticketsService.createUserTicket(req.userId, ticketTypeId);
    res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
    }
  }
}
