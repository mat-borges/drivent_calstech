import { Ticket, TicketType } from "@prisma/client";

import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.getTicketsTypes();
  return ticketTypes;
}

async function getUserTickets(userId: number): Promise<Ticket[]> {
  const userTickets = await ticketsRepository.getUserTickets(userId);
  return userTickets;
}

const ticketsService = { getTicketsTypes, getUserTickets };

export default ticketsService;
