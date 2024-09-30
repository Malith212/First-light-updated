"use client";
import React from "react";
import Header from "./header";
import { UserType } from "<pages>/interfaces";
import { GetCurrentUserFromMongoDB } from "<pages>/server-actions/users";
import { message } from "antd";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUserData, setLoggedInUserData] =
    React.useState<UserType | null>(null);

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
    if (!loggedInUserData) {
      getUserData();
    }
  }, []);

  return (
    <div>
      <Header 
        loggedInUserData={loggedInUserData}
        />
      {children}
    </div>
  );
}

export default LayoutProvider;
