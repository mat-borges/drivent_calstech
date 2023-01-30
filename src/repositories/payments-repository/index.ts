import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

function getPaymentOfUser(userId: number, ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      Ticket: {
        id: ticketId,
        Enrollment: {
          User: { id: userId },
        },
      },
    },
  });
}

function issuePayment(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits,
    },
  });
}

const paymentsRepository = {
  getPaymentByTicketId,
  issuePayment,
  getPaymentOfUser,
};

export default paymentsRepository;
