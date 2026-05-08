/** @format */
"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useState } from "react";
import LogoutModal from "./LogOutModal";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  console.log("User in DashboardSidebar:", user);

  const isCollapsed = state === "collapsed";

  const adminNavItems = [
    {
      href: "/admin/users",
      icon: Users,
      label: "Users",
    },
    {
      href: "/admin/catalogue",
      icon: Package,
      label: "Catalogue",
    },
    {
      href: "/admin/orders",
      icon: ShoppingCart,
      label: "Orders",
    },
    {
      href: "/admin/applications",
      icon: FileText,
      label: "Applications",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  const navItems = adminNavItems;
  const homeHref = "/admin/users";

  const handleLogout = () => {
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
    <Sidebar
      className={cn(
        "py-0 border-none bg-transparent",
        isCollapsed ? "px-1" : "px-0",
      )}
      collapsible="icon"
    >
      <SidebarContent
        className={cn(
          "h-full bg-card text-primary border-none px-3 pt-4 pb-6 rounded-r-2xl",
          isCollapsed ? "px-1" : "",
        )}
      >
        <div className={cn("mb-5", isCollapsed ? "px-0" : "px-1")}>
          <Link
            href={homeHref}
            className={cn(
              "flex items-start",
              isCollapsed ? "justify-center" : "gap-2.5",
            )}
          >
            {isCollapsed ? (
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={150}
                  height={150}
                  className="w-9 h-9"
                />{" "}
                Gafbi Health Care
              </div>
            )}
          </Link>
        </div>

        {/* admin info  */}
        {!isCollapsed && (
          <div className="mb-4 px-1 flex min-h-[96px] flex-col items-center justify-center">
            {user ? (
              <>
                <div className="mb-2 h-12 w-12 rounded-full overflow-hidden border border-primary/20">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`}
                    alt="Admin Avatar"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-lg font-semibold leading-tight text-primary">
                  {user.name}
                </p>
                <p className="mt-0.5 text-sm leading-tight text-tertiary">
                  {user.email_address}
                </p>
              </>
            ) : (
              <>
                <div className="h-12 w-12 rounded-full bg-[#edf0f4]" />
                <div className="mt-2 h-4 w-28 rounded bg-[#edf0f4]" />
                <div className="mt-1.5 h-3 w-36 rounded bg-[#edf0f4]" />
              </>
            )}
          </div>
        )}

        <SidebarMenu
          className={cn(
            "space-y-1",
            isCollapsed ? "items-center px-0" : "px-0",
          )}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname?.startsWith(item.href + "/")
              }
              collapsed={isCollapsed}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter
        className={cn("px-3 pb-6 pt-2", isCollapsed ? "px-1" : "")}
      >
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className={cn(
            isCollapsed
              ? "flex size-10 items-center justify-center rounded-lg transition-colors"
              : "flex h-10 w-full items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
            "text-primary/90 hover:bg-background/60 hover:text-primary",
          )}
        >
          <LogOut size={17} strokeWidth={1.75} />
          {!isCollapsed && (
            <span className="text-[15px] font-medium">Logout</span>
          )}
        </button>
      </SidebarFooter>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </Sidebar>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex size-10 items-center justify-center rounded-lg transition-colors"
              : "flex h-10 items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
            active
              ? "bg-background text-primary hover:text-primary! hover:bg-background/90!"
              : "text-primary/90  hover:bg-background/60! hover:text-primary!",
          )}
        >
          <Icon size={17} strokeWidth={1.75} />
          {!collapsed && (
            <span className="text-[15px] font-medium">{label}</span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
