import LinkButton from '<pages>/components/link-button'
import PageTitle from '<pages>/components/page-title'
import VillaModel from '<pages>/models/villa-model'
import React from 'react'
import VillasTable from './_common /villas-table';

async function VillaPage() {
  const response = await VillaModel.find().sort({ createdAt: -1 });
  const villas =JSON.parse(JSON.stringify(response));

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Villas" />
        <LinkButton title="Add Villa" path="/admin/villas/add" />
      </div>

      <VillasTable villas={villas} />
    </div>
  )
}

export default VillaPage