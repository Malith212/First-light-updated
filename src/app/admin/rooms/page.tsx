import React from "react";
import PageTitle from '<pages>/components/page-title'
import LinkButton from '<pages>/components/link-button'

function RoomsPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Rooms" />
        <LinkButton title="Add Room" path="/admin/rooms/add" />
 
      </div>

      {/* <VillasTable villas={villas} /> */}
    </div>
  );
}

export default RoomsPage;
