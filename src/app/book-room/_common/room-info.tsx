import { RoomType } from "<pages>/interfaces";
import { Image } from "antd";
import React from "react";

function RoomInfo({ room }: { room: RoomType }) {
  const renderRoomProperty = (label: string, value: string) => {
    return (
      <div className="flex flex-col text-gray-300">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-sm font-semibold"> {value}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-7">
        {room.media.map((media, index) => (
          <Image
            src={media}
            key={index}
            width={200}
            height={170}
            className="rounded-lg border border-gray-600"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-7 capitalize">
        {renderRoomProperty("Room Name", room.name)}
        {renderRoomProperty("Room Type", room.type)}
        {renderRoomProperty("Room Number", room.roomNumber.toString())}
        {renderRoomProperty("Rent Per Day", room.rentPerDay.toString())}
        {renderRoomProperty("BedRooms", room.beds.toString())}
        {renderRoomProperty("Owner", room.villa.owner)}
        {renderRoomProperty("Email", room.villa.email)}
        {renderRoomProperty("Phone", room.villa.phone)}
      </div>

      <div className="mt-7">
        <span className="text-xs text-gray-400">Amenities</span>
        <div className="flex flex-wrap gap-7 mt-2">
          {room.amenities.split(",").map((amenity, index) => (
            <div
              key={index}
              className="bg-purple-900/30 text-purple-300 rounded-md px-3 py-1 text-xs capitalize border border-purple-700"
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;