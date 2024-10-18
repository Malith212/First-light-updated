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
  User2,
} from "lucide-react";
import { on } from "events";
import { usePathname, useRouter } from "next/navigation";
import item from "antd/es/list/Item";
import { useAuth } from "@clerk/nextjs";

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
  const pathname = usePathname();

  const { signOut } = useAuth();

  const onLogout = async () => {
    await signOut();
    setShowsSideBar(false);
    router.push("/sign-in");
  };

  const userMenueItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/user/bookings"),
      isActive: pathname === "/user/bookings",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onClick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ];

  const adminMenueItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings"),
      isActive: pathname === "/admin/bookings",
    },
    {
      name: "Villas",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/villas"),
      isActive: pathname.includes("/admin/villas"),
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms"),
      isActive: pathname.includes("/admin/rooms"),
    },
    {
      name: "Users",
      icon: <User2 size={iconSize} />,
      onClick: () => router.push("/admin/users"),
      isActive: pathname.includes("/admin/users"),
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onClick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
  ];

  const menuItemsToShow: any[] = loggedInUserData?.isAdmin
    ? adminMenueItems
    : userMenueItems;

  return (
    <Drawer open={showsSideBar} onClose={() => setShowsSideBar(false)} closable>
      <div className="flex flex-col gap-10">
        {menuItemsToShow.map((item, index) => (
          <div
            className={`flex gap-4 items-center text-gray-700 cursor-pointer px-7 py-3 rounded ${
              item.isActive ? "bg-gray-700 text-white" : ""
            }`}
            key={index}
            onClick={() => {
              item.onClick();
              setShowsSideBar(false);
            }}
          >
            {item.icon}
            <span className="mt-[2px]">{item.name}</span>
          </div>
        ))}

        <span
          className="text-center cursor-pointer  text-red-500"
          onClick={onLogout}
        >
          Logout
        </span>
      </div>
    </Drawer>
  );
}

export default SideBar;
