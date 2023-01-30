import { CreateTicketBody } from "@/controllers/tickets-controller";
import Joi from "joi";

export const ticketSchema = Joi.object<CreateTicketBody>({
  ticketTypeId: Joi.number().integer().required(),
});
