import React from "react";
import RoomModel from "<pages>/models/room-model";
import VillaModel from "<pages>/models/villa-model";
import PageTitle from "<pages>/components/page-title";
import RoomsForm from "../../_common/rooms-form";

async function EditRoomPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await RoomModel.findById(params.id);
  const room = JSON.parse(JSON.stringify(response));

  const villaResponse = await VillaModel.find();
  const villas = JSON.parse(JSON.stringify(villaResponse));

  return (
    <div>
      <PageTitle title="Edit Room" />
      <RoomsForm type="edit" initialData={room} villas={villas} />
    </div>
  );
}

export default EditRoomPage;
