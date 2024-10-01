import { connectMongoDB } from "<pages>/config/db";
import { GetCurrentUserFromMongoDB } from "<pages>/server-actions/users";
connectMongoDB();

export default async function Home() {
  await GetCurrentUserFromMongoDB();

  return (
    <div>
      Homepage
    </div>
  );
}
