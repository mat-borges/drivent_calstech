import { Hotel, Room } from "@prisma/client";

import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.business(),
    },
  });
}

export async function createHotelRooms(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.name.lastName(),
      capacity: faker.datatype.number({ min: 1, max: 4 }),
      hotelId,
    },
  });
}
