import { UserType } from "<pages>/interfaces";
import React from "react";
import { User } from "lucide-react";
import SideBar from "./sidebar";

function UserInfo({ loggedInUserData }: { loggedInUserData: UserType }) {
  const [showsSideBar, setShowsSideBar] = React.useState(false);
  return (
    <div className="p-5 border-0 border-l border-solid border-gray-700 flex items-center gap-5">
      <span className="text-gray-300 text-sm">{loggedInUserData.name}</span>
      <User
        className="text-gray-300 cursor-pointer hover:text-purple-500 transition-all duration-300"
        onClick={() => setShowsSideBar(!showsSideBar)}
      />

      {showsSideBar && (
        <SideBar
          showsSideBar={showsSideBar}
          setShowsSideBar={setShowsSideBar}
          loggedInUserData={loggedInUserData}
        />
      )}
    </div>
  );
}

export default UserInfo;
