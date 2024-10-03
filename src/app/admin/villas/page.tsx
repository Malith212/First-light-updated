import LinkButton from '<pages>/components/link-button'
import PageTitle from '<pages>/components/page-title'
import React from 'react'

function VillaPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Villas" />
        <LinkButton title="Add Villa" path="/admin/villas/add" />
      </div>
    </div>
  )
}

export default VillaPage