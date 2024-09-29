import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { connectDB } from "<pages>/config/db";
import { GetCurrentUserFromMongoDB } from "<pages>/server-actions/users";
import { UserType } from "<pages>/interfaces";
connectDB();

export default async function Home() {
  const response: any = await GetCurrentUserFromMongoDB();
  let mongoUser: UserType | null = null;
  if (response.success) {
    mongoUser = response.data;
  }

  let mongoUserId = "";
  let clerkUserId = "";
  let name = "";
  let email = "";

  if (mongoUser) {
    mongoUserId = mongoUser._id;
    clerkUserId = mongoUser.clerkUserId;
    name = mongoUser.name;
    email = mongoUser.email;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 text-sm">
      <h1 className="text-3xl text-gray-500 font-bold uppercase">
        First Light Villas...
      </h1>
      <h1>Clerk User Id : {clerkUserId}</h1>
      <h1>MongoDB User Id : {mongoUserId}</h1>
      <h1>Name : {name}</h1>
      <h1>Email : {email}</h1>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
