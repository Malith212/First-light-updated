import { Drawer } from "antd";
import React from "react";
import { UserType } from "<pages>/interfaces";
import { BedDouble, GitGraph, Home, Hotel, List, User, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
    { name: "Home", icon: <Home size={iconSize} />, onClick: () => router.push("/"), isActive: pathname === "/" },
    { name: "Bookings", icon: <List size={iconSize} />, onClick: () => router.push("/user/bookings"), isActive: pathname === "/user/bookings" },
    { name: "Profile", icon: <User size={iconSize} />, onClick: () => router.push("/user/profile"), isActive: pathname === "/user/profile" },
  ];

  const adminMenueItems: any[] = [
    { name: "Home", icon: <Home size={iconSize} />, onClick: () => router.push("/"), isActive: pathname === "/" },
    { name: "Bookings", icon: <List size={iconSize} />, onClick: () => router.push("/admin/bookings"), isActive: pathname === "/admin/bookings" },
    { name: "Villas", icon: <Hotel size={iconSize} />, onClick: () => router.push("/admin/villas"), isActive: pathname.includes("/admin/villas") },
    { name: "Rooms", icon: <BedDouble size={iconSize} />, onClick: () => router.push("/admin/rooms"), isActive: pathname.includes("/admin/rooms") },
    { name: "Users", icon: <User2 size={iconSize} />, onClick: () => router.push("/admin/users"), isActive: pathname.includes("/admin/users") },
    { name: "Reports", icon: <GitGraph size={iconSize} />, onClick: () => router.push("/admin/reports"), isActive: pathname === "/admin/reports" },
  ];

  const menuItemsToShow: any[] = loggedInUserData?.isAdmin ? adminMenueItems : userMenueItems;

  return (
    <Drawer
      open={showsSideBar}
      onClose={() => setShowsSideBar(false)}
      closable={false}
      placement="right"
      bodyStyle={{ padding: 0, backgroundColor: "#1F2937" }}
      width={250}
      className="sidebar-drawer"
    >
      <div className="flex flex-col h-full p-5">
        {/* Sidebar Header */}
        <div className="text-white text-sm font-bold mb-10 p-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg">
          {loggedInUserData?.name || "User"}
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-3 flex-1">
          {menuItemsToShow.map((item, index) => (
            <div
              className={`flex gap-4 items-center text-gray-300 cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white ${
                item.isActive ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg" : ""
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
        </div>

        {/* Logout Button */}
        <div
          className="text-center cursor-pointer text-red-400 py-3 px-4 rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white mt-auto"
          onClick={onLogout}
        >
          Logout
        </div>
      </div>
    </Drawer>
  );
}

export default SideBar;
