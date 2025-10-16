"use client";

import * as React from "react";
import {
  IconCamera,
  IconDashboard,
  IconFileAi,
  IconFileDescription,IconPlus,         
  IconEye,          
  IconChartBar,
} from "@tabler/icons-react";
import { FaUsersGear } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import logoFront from "./../public/logo.png";


const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      roles: ["MANAGEMENT", "ADMIN", "SUPER_ADMIN"],
    },
    {
      title: "Agent Monitor",
      url: "agent-monitor",
      icon: FaUsersGear,
      roles: ["ADMIN", "SUPER_ADMIN"],
      items: [
        {
          title: "Create",
          url: "/agent-monitor/create",
          roles: ["SUPER_ADMIN"],
          icon: IconPlus,
        },
        {
          title: "View",
          url: "/agent-monitor/view",
          roles: ["ADMIN", "SUPER_ADMIN"],
          icon: IconEye,
        },
        {
          title: "Performance",
          url: "/performance/zone",
          roles: ["SUPER_ADMIN"],
          icon: IconChartBar,
        },
      ],
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      url: "#",
      roles: ["SUPER_ADMIN"],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      roles: ["SUPER_ADMIN"],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      roles: ["SUPER_ADMIN"],
    },
  ],
  navSecondary: [],
  documents: [],
};


function SidebarSkeleton(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} aria-busy="true">
      {/* Header Skeleton */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-3 px-2 py-3">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-5 w-24" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content Skeleton */}
      <SidebarContent>
        <div className="px-3 py-2 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`main-${i}`}
              className="flex items-center gap-3 rounded-md p-2"
            >
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>

        <div className="px-3 py-4 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`secondary-${i}`}
              className="flex items-center gap-3 rounded-md p-2"
            >
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </SidebarContent>

      {/* Footer Skeleton */}
      <SidebarFooter>
        <div className="flex items-center gap-3 px-3 py-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  const currentUser = {
    name: session?.user.role || "User",
    email: session?.user?.email || "No email",
    avatar:
      session?.user?.image || "https://i.ibb.co.com/20vHRDWR/blank-user.png",
  };

  // Role-based filtering
  const filterByRole = <T extends { roles?: string[] }>(items: T[]): T[] => {
    if (!userRole) return [];
    return items.filter((item) => {
      if (!item.roles || item.roles.length === 0) return true;
      return item.roles.includes(userRole);
    });
  };

  const filteredNavMain = filterByRole(data.navMain).map((item) => {
    if (item.items) {
      return {
        ...item,
        items: filterByRole(item.items),
      };
    }
    return item;
  });

  const filteredNavClouds = filterByRole(data.navClouds);

  if (status === "loading") {
    return <SidebarSkeleton {...props} />;
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <div className="flex items-center gap-3 px-2">
                  <Image
                    src={logoFront}
                    alt="BakiTe Logo"
                    width={48}
                    height={48}
                    priority
                    className="object-contain rounded-md transition-transform duration-300 group-hover:scale-105 dark:brightness-110"
                  />
                  <span className="text-lg font-semibold tracking-wide text-gray-800 dark:text-gray-100">
                    BakiTe
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
