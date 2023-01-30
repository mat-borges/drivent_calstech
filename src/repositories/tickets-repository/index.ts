import { PrismaClient, PrismaPromise, Ticket, TicketStatus, TicketType } from "@prisma/client";

const prisma = new PrismaClient();

function getTicketsTypes(): PrismaPromise<TicketType[]> {
  return prisma.ticketType.findMany();
}

function getUserTickets(id: number): PrismaPromise<Ticket[]> {
  return prisma.ticket.findMany({
    where: { enrollmentId: id },
  });
}

function newTicket(ticketTypeId: number, enrollmentId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status,
    },
  });
}

const ticketsRepository = {
  getTicketsTypes,
  getUserTickets,
  newTicket,
};

export default ticketsRepository;
