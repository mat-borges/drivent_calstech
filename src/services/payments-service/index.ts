import { notFoundError, unauthorizedError } from "@/errors";

import { badRequestError } from "@/errors/bad-request-error";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketPayment(ticketId: number, userId: number) {
  if (!ticketId) throw badRequestError();

  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const checkUser = await paymentsRepository.getPaymentOfUser(userId, ticketId);
  if (!checkUser) throw unauthorizedError();

  const payment = await paymentsRepository.getPaymentByTicketId(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

const paymentsService = {
  getTicketPayment,
};

export default paymentsService;
