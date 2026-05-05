/** @format */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LogoutModal from "./LogOutModal";
import { SidebarTrigger } from "../ui/sidebar";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsLogoutModalOpen(false);
    router.push("/sign-in");
  };
  if (
    pathname == "/sign-in" ||
    pathname == "/sign-up" ||
    pathname == "/create-new-pass" ||
    pathname == "/reset-pass" ||
    pathname == "/verify-email" ||
    pathname == "/verify-otp"
  )
    return null;
  return (
    <div className="w-full sticky top-0 z-9 ">
      <div className="max-w-625 rounded-2xl mx-auto flex items-center justify-between  px-3  py-3">
        <div className="flex gap-2 items-center justify-center">
          {/* mobile menu button */}
          <div className=" rounded-sm ">
            <SidebarTrigger />
          </div>
          {/* Left side - Title */}
          <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl 2xl:text-3xl font-bold text-primary truncate">
            Dashboard
          </h1>
        </div>

        {/* Right side - Notification, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4"></div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default NavBar;
