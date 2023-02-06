import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import { badRequestError } from "@/errors/bad-request-error";
import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const hotels = await hotelsService.getHotels(userId);
    res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else if (error.name === "PaymentRequired") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const hotelId = parseInt(req.params.hotelId);
  const userId = req.userId;

  try {
    const rooms = await hotelsService.getHotelRooms(hotelId, userId);
    res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else if (error.name === "PaymentRequired") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
