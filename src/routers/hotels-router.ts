import { getHotelRooms, getHotels } from "@/controllers";

import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken).get("/", getHotels).get("/:hotelId", getHotelRooms);

export default hotelsRouter;
