import LinkButton from "<pages>/components/link-button";
import PageTitle from "<pages>/components/page-title";
import RoomModel from "<pages>/models/room-model";
import React from "react";
import RoomsTable from "./_common/rooms-table";
import VillaModel from "<pages>/models/villa-model";
import mongoose from "mongoose";

async function RoomsPage() {
  const response = await RoomModel.find()
    // .populate({ path: "villa", model: mongoose.model("villas") })
    .sort({ createdAt: -1 });
  const rooms = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Rooms" />
        <LinkButton path="/admin/rooms/add" title="Add Room" />
      </div>

      <RoomsTable rooms={rooms} />
    </div>
  );
}

export default RoomsPage;
