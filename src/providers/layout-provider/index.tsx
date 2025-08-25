"use client";
import React from "react";
import Header from "./header";
import { UserType } from "<pages>/interfaces";
import { GetCurrentUserFromMongoDB } from "<pages>/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";
import Spinner from "<pages>/components/spinner";
import Footer from "./Footer";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUserData, setLoggedInUserData] =
    React.useState<UserType | null>(null);

  const pathname = usePathname();
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";
  const isAdminRoute = pathname.includes("/admin");

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

  if (loggedInUserData && isAdminRoute && !loggedInUserData.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col">
        <Header loggedInUserData={loggedInUserData} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400 text-sm px-5 lg:px-20">
            You are not authorized to access this page
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return <Spinner fullHeight />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col">
      <Header loggedInUserData={loggedInUserData} />
      <div className="flex-1 px-5 lg:px-20 mt-10 pb-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default LayoutProvider;