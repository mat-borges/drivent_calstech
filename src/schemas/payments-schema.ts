import Joi from "joi";
import { PaymentProcessInfo } from "@/services/payments-service";

export const paymentSchema = Joi.object<PaymentProcessInfo>({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().integer().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().integer().required(),
  }),
});
