import PageTitle from "<pages>/components/page-title";
import React from "react";
import VillaForm from "../../_common /villa-form";
import VillaModel from "<pages>/models/villa-model";

async function EditVilla({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const villaId = params.id;
  const response = await VillaModel.findById(villaId);
  const villa = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="Edit Villa" />
      <VillaForm type="edit"
        initialData={villa}/>
    </div>
  );
}

export default EditVilla;
