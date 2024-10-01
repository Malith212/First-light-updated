"use client";
import React from "react";
import Header from "./header";
import { UserType } from "<pages>/interfaces";
import { GetCurrentUserFromMongoDB } from "<pages>/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUserData, setLoggedInUserData] =
    React.useState<UserType | null>(null);

  const pathname = usePathname();
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";

  const getUserData = async () => {
    try {
      const response = await GetCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedInUserData(response.data);
        console.log(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    if (!loggedInUserData && !isAuthRoute) {
      getUserData();
    }
  }, []);

  if (isAuthRoute) {
    return children;
  }

  return (
    <div>
      <Header loggedInUserData={loggedInUserData} />
      {children}
    </div>
  );
}

export default LayoutProvider;
