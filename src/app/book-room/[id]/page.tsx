import RoomModel from "<pages>/models/room-model";
import { RoomType } from "<pages>/interfaces";
import React from "react";
import RoomInfo from "../_common/room-info";
import Checkout from "../_common/checkout";
import mongoose from "mongoose";

async function BookRoomPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await RoomModel.findById(params.id)
    .populate({ path: "villa", model: mongoose.model("villas") });
  const room: RoomType = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div>
        <h1 className="font-bold text-gray-300 text-2xl">
          {room.name} - {room.villa.name}
        </h1>
        <span className="text-gray-400 text-sm">{room.villa.address}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-7">
        <div className="col-span-2">
          <RoomInfo room={room} />
        </div>
        <div className="col-span-1">
          <Checkout room={room} />
        </div>
      </div>
    </div>
  );
}

export default BookRoomPage;