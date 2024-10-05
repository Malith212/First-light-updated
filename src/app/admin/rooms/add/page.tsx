import PageTitle from "<pages>/components/page-title";
import React from "react";
import RoomsForm from "../_common/rooms-form";
import VillaModel from "<pages>/models/villa-model";

async function AddRoomPage() {
  const response = await VillaModel.find();
  const villas = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="Add Room" />

      <RoomsForm type="add" villas={villas} />
    </div>
  );
}

export default AddRoomPage;
