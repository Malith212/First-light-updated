import { Drawer } from "antd";
import React from "react";
import { UserType } from "<pages>/interfaces";
import { BedDouble, GitGraph, Home, Hotel, Icon, List, User } from "lucide-react";
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

  const adminMenueItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings"),
    },
    {
      name: "Villas",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/villas"),
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms"),
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onClick: () => router.push("/admin/reports"),
    },
  ];

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
