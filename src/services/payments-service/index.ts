import { notFoundError, unauthorizedError } from "@/errors";

import { Payment } from "@prisma/client";
import { badRequestError } from "@/errors/bad-request-error";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketPayment(ticketId: number, userId: number): Promise<Payment> {
  if (!ticketId) throw badRequestError();

  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const checkUser = await ticketsRepository.chekTicketUserRelation(userId, ticketId);
  if (!checkUser) throw unauthorizedError();

  const payment = await paymentsRepository.getPaymentByTicketId(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

async function postTicketPayment(paymentInfo: PaymentProcessInfo, userId: number): Promise<Payment> {
  const { ticketId, cardData } = paymentInfo;
  if (!ticketId || !cardData) throw badRequestError();

  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const checkUser = await ticketsRepository.chekTicketUserRelation(userId, ticketId);
  if (!checkUser) throw unauthorizedError();

  const { issuer, number } = cardData;
  const cardLastDigits = number.toString().slice(-4);

  const payment = await paymentsRepository.issuePayment(ticketId, ticket.TicketType.price, issuer, cardLastDigits);
  await ticketsRepository.updateTicketStatus(ticketId);
  return payment;
}

const paymentsService = {
  getTicketPayment,
  postTicketPayment,
};

export type PaymentProcessInfo = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export default paymentsService;
