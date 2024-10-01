import { Drawer } from "antd";
import React from "react";
import { UserType } from "<pages>/interfaces";
import { Home, Icon, List, User } from "lucide-react";
import { on } from "events";
import { useRouter } from "next/navigation";

function SideBar({
  showsSideBar,
  setShowsSideBar,
  loggedInUserData,
}: {
  showsSideBar: boolean;
  setShowsSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUserData: UserType;
}) {
  const iconSize = 20;
  const router = useRouter();

  const userMenueItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/user/bookings"),
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onClick: () => router.push("/user/profile"),
    },
  ];
  
  const adminMenueItems: any[] = [];

  const menuItemsToShow: any[] = loggedInUserData?.isAdmin
    ? adminMenueItems
    : userMenueItems;

  return (
    <Drawer
      open={showsSideBar}
      onClose={() => setShowsSideBar(false)}
      closable
    ></Drawer>
  );
}

export default SideBar;
