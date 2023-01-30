import { Ticket, TicketType } from "@prisma/client";

import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.getTicketsTypes();
  return ticketTypes;
}

async function getUserTickets(userId: number): Promise<Ticket> {
  const userTickets = await ticketsRepository.getUserTickets(userId);

  if (!userTickets) {
    throw notFoundError();
  } else {
    return userTickets;
  }
}

async function createUserTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  } else {
    const ticket = await ticketsRepository.newTicket(ticketTypeId, enrollment.id);
    return ticket;
  }
}

const ticketsService = { getTicketsTypes, getUserTickets, createUserTicket };

export default ticketsService;
