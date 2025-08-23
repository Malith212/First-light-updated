import React from "react";
import Link from "next/link";
import { RoomType } from "<pages>/interfaces";
import { GetAvailableRooms } from "<pages>/server-actions/bookings";
import VillaModel from "<pages>/models/villa-model"; // just to trigger villa query

async function RoomsData({ searchParams }: { searchParams: any }) {
  // 🔹 Call villas to warm up DB (not used in UI)
  await VillaModel.find({}).lean();

  // 🔹 Get rooms based on filters
  const response = await GetAvailableRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type || "",
  });

  const rooms: RoomType[] = response?.data || [];

  if (!rooms || rooms.length === 0) {
    return <div>No rooms found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {rooms.map((room: RoomType) => (
        <Link
          href={`book-room/${room._id}`}
          key={room._id}
          className="no-underline text-black"
        >
          <div className="flex flex-col gap-2 border border-gray-200 border-solid room-card">
            <img src={room.media[0]} className="w-full h-64 object-cover" />

            <div className="px-3 py-2 flex flex-col text-sm gap-2">
              <span>{room.name}</span>
              <span className="text-gray-500 text-xs">
                {room.villa.name} - {room.villa.address}
              </span>

              <hr className="border-gray-200 border border-solid" />
              <div className="flex justify-between">
                <span>Rs {room.rentPerDay} / Per day</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RoomsData;
