import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spinner from "<pages>/components/spinner";
import Filters from "./_common/filters";

export default async function Home({ searchParams }: { searchParams: any }) {
  return (
    <div>
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Spinner />}>
        <RoomsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
