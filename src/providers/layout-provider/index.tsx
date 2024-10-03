"use client";
import React from "react";
import Header from "./header";
import { UserType } from "<pages>/interfaces";
import { GetCurrentUserFromMongoDB } from "<pages>/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";
import Spinner from "<pages>/components/spinner";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUserData, setLoggedInUserData] =
    React.useState<UserType | null>(null);

  const pathname = usePathname();
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";

  const [loading, setLoading] = React.useState(true);

  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await GetCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedInUserData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <Spinner fullHeight />;
  }

  return (
    <div>
      <Header loggedInUserData={loggedInUserData} />

      <div className="px-5 lg:px-20 mt-10">{children}</div>
    </div>
  );
}

export default LayoutProvider;
