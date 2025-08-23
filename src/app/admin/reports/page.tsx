import PageTitle from "<pages>/components/page-title";
import React, { Suspense } from "react";
import ReportsFilters from "./_common/reports-filters";
import ReportsData from "./_common/reports-data";
import ReportsGraphs from "./_common/ReportsGraphs";
import Spinner from "<pages>/components/spinner";

function ReportsPage({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <PageTitle title="Reports" />

      <ReportsFilters searchParams={searchParams} />

      <Suspense key={suspenseKey} fallback={<Spinner fullHeight />}>
        <div className="space-y-10">
          <ReportsData searchParams={searchParams} />
          <ReportsGraphs searchParams={searchParams} />
        </div>
      </Suspense>
    </div>
  );
}

export default ReportsPage;