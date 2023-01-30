import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;
  const userId = req.userId;

  try {
    const payment = await paymentsService.getTicketPayment(+ticketId, userId);
    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
