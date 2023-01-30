import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
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
};

export default paymentsRepository;
