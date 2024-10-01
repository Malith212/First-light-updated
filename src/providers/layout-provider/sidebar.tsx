import { Drawer } from "antd";
import React from "react";
import { UserType } from "<pages>/interfaces";

function SideBar({
  showsSideBar,
  setShowsSideBar,
  loggedInUserData
}: {
  showsSideBar: boolean;
  setShowsSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUserData: UserType;
}) {
  return (
    <Drawer
      open={showsSideBar}
      onClose={() => setShowsSideBar(false)}
      closable
    ></Drawer>
  );
}

export default SideBar;
