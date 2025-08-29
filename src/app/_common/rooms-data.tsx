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
    return (
      <div className="text-center text-gray-400 py-10 text-sm">
        No rooms found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {rooms.map((room: RoomType) => (
        <Link
          href={`book-room/${room._id}`}
          key={room._id}
          className="no-underline"
        >
          <div className="flex flex-col gap-3 bg-gradient-to-b mb-7 from-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src={room.media[0]}
              alt={room.name}
              className="w-full h-64 object-cover"
            />

            <div className="px-4 py-3 flex flex-col text-sm gap-2 text-gray-300">
              <span className="text-lg font-semibold bg-clip-text text-transparent text-white">
                {room.name}
              </span>
              <span className="text-gray-400 text-xs">
                {room.villa.name} — {room.villa.address}
              </span>

              <hr className="border-gray-700" />
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">
                  Rs {room.rentPerDay} / <span className="text-gray-400">day</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RoomsData;
