import React from "react";
import { UserType } from "<pages>/interfaces";
import ProjectTitle from "./project-title";
import { Button } from "antd";
import UserInfo from "./user-info";

function Header({ loggedInUserData }: { loggedInUserData: UserType | null }) {
  if (!loggedInUserData) {
    return (
      <div className="flex justify-between items-center py-4 px-5 bg-gradient-to-r from-gray-900 to-gray-800">
        <ProjectTitle />
        <Button type="primary" style={{ color: "#fff", borderRadius: "8px" }}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-20 bg-gradient-to-r  to-gray-800">
      <div className="flex justify-between items-center border-b-2 border-gray-600 py-4">
        <ProjectTitle />
        <UserInfo loggedInUserData={loggedInUserData} />
      </div>
    </div>
  );
}

export default Header;
