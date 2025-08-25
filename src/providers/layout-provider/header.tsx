import React from "react";
import { UserType } from "<pages>/interfaces";
import ProjectTitle from "./project-title";
import { Button } from "antd";
import UserInfo from "./user-info";

function Header({ loggedInUserData }: { loggedInUserData: UserType | null }) {
  if (!loggedInUserData) {
    return (
      <div className="flex justify-between items-center py-4 px-5 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <ProjectTitle />
        <Button
          type="primary"
          className="bg-gradient-to-r from-purple-600 to-blue-500 border-none text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-20 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="flex justify-between items-center border-b-2 border-gray-700 py-4">
        <ProjectTitle />
        <UserInfo loggedInUserData={loggedInUserData} />
      </div>
    </div>
  );
}

export default Header;
