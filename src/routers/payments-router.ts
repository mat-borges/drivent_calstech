import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketPayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken).get("/payments", getTicketPayment).post("/payments");

export { paymentsRouter };
