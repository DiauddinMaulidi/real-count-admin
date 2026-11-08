"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useState } from "react";

type UserRole = "ADMIN" | "PETUGAS_TPS";

export default function PetugasLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [users, setUsers] = useState<UserRole | null>(null);

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersRole = await fetch("/api/users");

        if (!usersRole.ok) {
          throw new Error("Tidak jelas");
        }

        const dataUsersRole = await usersRole.json();
        setUsers(dataUsersRole.role);
      } catch (error) {
        console.error("data role user tidak jelas ", error);
      }
    }

    fetchUsers();
  }, []);

  if (!users) {
    return <div>Role pengguna tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar userRole={users} />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
