import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spinner from "<pages>/components/spinner";
import Filters from "./_common/filters";

export default async function Home() {
  return (
    <div>
      <Filters />
      <Suspense fallback={<Spinner />}>
        <RoomsData />
      </Suspense>
    </div>
  );
}
