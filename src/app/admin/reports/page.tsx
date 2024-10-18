import PageTitle from '<pages>/components/page-title'
import React from 'react'
import ReportsFilters from './_common/reports-filters'

function ReportsPage({searchParams}: {searchParams: any}) {
  console.log(searchParams);
  return (
    <div>
      <PageTitle title="Reports" />

      <ReportsFilters 
      searchParams={searchParams}
      />
    </div>
  )
}

export default ReportsPage