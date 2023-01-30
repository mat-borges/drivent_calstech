import { PrismaClient, PrismaPromise, Ticket, TicketStatus, TicketType } from "@prisma/client";

const prisma = new PrismaClient();

function getTicketsTypes(): PrismaPromise<TicketType[]> {
  return prisma.ticketType.findMany();
}

function getUserTickets(userId: number): PrismaPromise<Ticket & { TicketType: TicketType }> {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: { userId },
    },
    include: {
      TicketType: true,
    },
  });
}

function newTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      TicketType: {
        connect: {
          id: ticketTypeId,
        },
      },
      Enrollment: {
        connect: {
          id: enrollmentId,
        },
      },
    },
    include: {
      TicketType: true,
    },
  });
}

function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: { id: ticketId },
  });
}

const ticketsRepository = {
  getTicketsTypes,
  getUserTickets,
  newTicket,
  findTicketById,
};

export default ticketsRepository;
