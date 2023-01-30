import { Ticket, TicketType } from "@prisma/client";

import enrollmentRepository from "@/repositories/enrollment-repository";
import httpStatus from "http-status";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.getTicketsTypes();
  return ticketTypes;
}

async function getUserTickets(userId: number): Promise<Ticket> {
  const userTickets = await ticketsRepository.getUserTickets(userId);
  return userTickets;
}

async function createUserTicket(userId: number, ticketTypeId: number) {
  const enrollmentId = (await enrollmentRepository.findWithAddressByUserId(userId)).id;

  if (!enrollmentId) {
    throw httpStatus.NOT_FOUND;
  } else {
    const ticket = await ticketsRepository.newTicket(ticketTypeId, enrollmentId);
    return ticket;
  }
}

const ticketsService = { getTicketsTypes, getUserTickets, createUserTicket };

export default ticketsService;
