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

function newTicket(ticketTypeId: number, enrollmentId: number): PrismaPromise<Ticket & { TicketType: TicketType }> {
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

function findTicketById(ticketId: number): PrismaPromise<Ticket & { TicketType: TicketType }> {
  return prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { TicketType: true },
  });
}

function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: TicketStatus.PAID,
    },
    include: { TicketType: true },
  });
}

function chekTicketUserRelation(userId: number, ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
      Enrollment: {
        User: { id: userId },
      },
    },
    include: { TicketType: true },
  });
}

const ticketsRepository = {
  getTicketsTypes,
  getUserTickets,
  newTicket,
  findTicketById,
  updateTicketStatus,
  chekTicketUserRelation,
};

export default ticketsRepository;
