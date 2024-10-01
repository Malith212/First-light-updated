import { Drawer } from "antd";
import React from "react";
import { UserType } from "<pages>/interfaces";
import {
  BedDouble,
  GitGraph,
  Home,
  Hotel,
  Icon,
  List,
  User,
} from "lucide-react";
import { on } from "events";
import { useRouter } from "next/navigation";
import Item from "antd/es/list/Item";

function SideBar({
  showsSideBar,
  setShowsSideBar,
  loggedInUserData,
}: {
  showsSideBar: boolean;
  setShowsSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUserData: UserType;
}) {
  const iconSize = 18;
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
    <Drawer open={showsSideBar} onClose={() => setShowsSideBar(false)} closable>
      <div className="flex flex-col gap-14 text-gray-700 cursor-pointer">
        {menuItemsToShow.map((Item, index) => {
          return (
            <div
              className="flex gap-4 items-center"
              key={index}
              onClick={() => {
                Item.onClick();
                setShowsSideBar(false);
              }}
            >
              {Item.icon}
              <span className="mt -[2px]">{Item.name}</span>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
}

export default SideBar;
