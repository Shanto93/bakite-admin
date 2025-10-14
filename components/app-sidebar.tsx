// "use client";

// import * as React from "react";
// import {
//   IconCamera,
//   IconDashboard,
//   IconFileAi,
//   IconFileDescription,
//   IconInnerShadowTop,
// } from "@tabler/icons-react";
// import { FaUsersGear } from "react-icons/fa6";

// import { NavDocuments } from "@/components/nav-documents";
// import { NavMain } from "@/components/nav-main";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// const data = {
//   user: {
//     name: "Bakite",
//     email: "bakite@gmail.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/dashboard",
//       icon: IconDashboard,
//     },

//     {
//       title: "Agent Monitor",
//       url: "agent-monitor",
//       icon: FaUsersGear,

//       items: [
//         {
//           title: "Create",
//           url: "/agent-monitor/create",
//         },
//         {
//           title: "View",
//           url: "/agent-monitor/view",
//         },
//         {
//           title: "Performance",
//           url: "/performance/zone",
//         },
//         {
//           title: "Testing",
//           url: "/agent-monitor/checking",
//         },
//       ],
//     },
//   ],
//   navClouds: [
//     {
//       title: "Capture",
//       icon: IconCamera,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Proposal",
//       icon: IconFileDescription,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Prompts",
//       icon: IconFileAi,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   navSecondary: [],
//   documents: [],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="offcanvas" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               asChild
//               className="data-[slot=sidebar-menu-button]:!p-1.5"
//             >
//               <a href="#">
//                 <IconInnerShadowTop className="!size-5" />
//                 <span className="text-base font-semibold">Bakite</span>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//         <NavDocuments items={data.documents} />
//         <NavSecondary items={data.navSecondary} className="mt-auto" />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }









/********************************************************************** */



"use client";

import * as React from "react";
import {
  IconCamera,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconInnerShadowTop,
} from "@tabler/icons-react";
import { FaUsersGear } from "react-icons/fa6";
import { useSession } from "next-auth/react";

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

const data = {
  user: {
    name: "Bakite",
    email: "bakite@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
        },
        {
          title: "View",
          url: "/agent-monitor/view",
          roles: ["ADMIN", "SUPER_ADMIN"],
        },
        {
          title: "Performance",
          url: "/performance/zone",
          roles: ["SUPER_ADMIN"],
        },
        {
          title: "Testing",
          url: "/agent-monitor/checking",
          roles: ["SUPER_ADMIN"],
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
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      roles: ["SUPER_ADMIN"],
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      roles: ["SUPER_ADMIN"],
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [],
  documents: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  const filterByRole = <T extends { roles?: string[] }>(items: T[]): T[] => {
    if (!userRole) return [];
    
    return items.filter((item) => {
      // If no roles defined, show to everyone
      if (!item.roles || item.roles.length === 0) return true;
      // Check if user's role is in the allowed roles
      return item.roles.includes(userRole);
    });
  };

  // Filter main navigation items and their sub-items
  const filteredNavMain = filterByRole(data.navMain).map((item) => {
    if (item.items) {
      return {
        ...item,
        items: filterByRole(item.items),
      };
    }
    return item;
  });

  // Filter cloud navigation items
  const filteredNavClouds = filterByRole(data.navClouds);

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">Bakite</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Bakite</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
