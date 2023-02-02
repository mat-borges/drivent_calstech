import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketPayment, postTicketPayment } from "@/controllers";

import { Router } from "express";
import { paymentSchema } from "@/schemas/payments-schema";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getTicketPayment)
  .post("/process", validateBody(paymentSchema), postTicketPayment);

export { paymentsRouter };
