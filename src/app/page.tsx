import { connectMongoDB } from "<pages>/config/db";
import { GetCurrentUserFromMongoDB } from "<pages>/server-actions/users";
connectMongoDB();

export default async function Home() {
  await GetCurrentUserFromMongoDB();

  return (
    <div>
      <h1>Homepage</h1>
    </div>
  );
}
