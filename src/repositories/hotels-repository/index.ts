import { Hotel, Room } from "@prisma/client";

import { prisma } from "@/config";

async function getHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function getHotelRooms(hotelId: number): Promise<HotelWithRooms> {
  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}

export type HotelWithRooms = Hotel & { Rooms: Room[] };

const hotelRepository = {
  getHotels,
  getHotelRooms,
};

export default hotelRepository;
