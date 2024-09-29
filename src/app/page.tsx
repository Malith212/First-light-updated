import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {

  let clerkUserId = "";
  let name = "";
  let email = "";

  const currentUserData = await currentUser();
  if(currentUserData){
    clerkUserId = currentUserData.id;
    name = currentUserData.firstName + " " + currentUserData.lastName;
    email = currentUserData.emailAddresses[0].emailAddress;
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 text-sm">
    <h1 className="text-3xl text-gray-500 font-bold uppercase">
      First Light Villas...
    </h1>
    <h1>Clerk User Id : {clerkUserId}</h1>
    <h1>Name : {name}</h1>
    <h1>Email : {email}</h1>
    <UserButton afterSignOutUrl="/sign-in" />
  </div>
  );
}
