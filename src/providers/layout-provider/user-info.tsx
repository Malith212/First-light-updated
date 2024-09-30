import { UserType } from "<pages>/interfaces";
import React from "react";
import { User } from "lucide-react";

function UserInfo({ loggedInUserData }: { loggedInUserData: UserType }) {
  return (
    <div className="p-5 border-0 border-l border-solid flex items-center gap-5">
      <span className="text-gray-500 text-sm">{loggedInUserData.name}</span>
      <User className="text-gray-500" />
    </div>
  );
}

export default UserInfo;
