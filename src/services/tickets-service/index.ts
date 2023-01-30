import { TicketType } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.getTicketsTypes();
  return ticketTypes;
}

const ticketsService = { getTicketsTypes };

export default ticketsService;
