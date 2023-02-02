import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotels-repository";
import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.getUserTickets(userId);
  if (!ticket) throw notFoundError();

  if (ticket.status !== "PAID") throw { name: "PaymentRequired", message: "Your ticket hasn't been paid yet." };
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw { name: "PaymentRequired", message: "Your ticket doesn't include hotel." };
  }

  const hotels = await hotelRepository.getHotels();
  if (!hotels || hotels.length === 0) throw notFoundError();

  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
