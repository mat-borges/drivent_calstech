import hotelRepository, { HotelWithRooms } from "@/repositories/hotels-repository";

import { Hotel } from "@prisma/client";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function checkEnrollmentAndTicketType(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.getUserTickets(userId);
  if (!ticket) throw notFoundError();
  if (ticket.status !== "PAID") {
    throw { name: "PaymentRequired", message: "Your ticket hasn't been paid yet." };
  }
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw { name: "PaymentRequired", message: "Your ticket doesn't include hotel." };
  }
}

async function getHotels(): Promise<Hotel[]> {
  const hotels = await hotelRepository.getHotels();
  if (!hotels || hotels.length === 0) {
    throw notFoundError();
  } else {
    return hotels;
  }
}

async function getHotelRooms(hotelId: number): Promise<HotelWithRooms> {
  const rooms = await hotelRepository.getHotelRooms(hotelId);
  if (!rooms || rooms.Rooms.length === 0) {
    throw notFoundError();
  } else {
    return rooms;
  }
}

const hotelsService = {
  checkEnrollmentAndTicketType,
  getHotels,
  getHotelRooms,
};

export default hotelsService;
