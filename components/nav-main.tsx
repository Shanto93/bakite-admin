"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: Array<{
    title: string;
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    isActive?: boolean;
    roles?: string[];
    items?: Array<{
      title: string;
      url: string;
      isActive?: boolean;
      roles?: string[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon?: any;
    }>;
  }>;
}) {
  const pathname = usePathname();

  // Track open state for each collapsible item
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() => {
    const initialStates: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.items) {
        const isChildActive = item.items.some(
          (sub) => pathname === sub.url || pathname.startsWith(sub.url)
        );
        initialStates[item.title] = isChildActive;
      }
    });
    return initialStates;
  });

  const handleToggle = (itemTitle: string, newState: boolean) => {
    setOpenStates((prev) => ({
      ...prev,
      [itemTitle]: newState,
    }));
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.items?.length;

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          const isChildActive =
            item.items?.some(
              (sub) => pathname === sub.url || pathname.startsWith(sub.url)
            ) ?? false;

          const isOpen = openStates[item.title] ?? isChildActive;

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              onOpenChange={(open) => handleToggle(item.title, open)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items!.map((sub) => {
                      const isActive =
                        pathname === sub.url || pathname.startsWith(sub.url);

                      return (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton asChild isActive={isActive}>
                            <Link
                              href={sub.url}
                              className="flex items-center gap-2"
                            >
                              {/* Icon or tiny dot if not provided */}
                              {sub.icon ? (
                                <sub.icon className="size-4" />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                              )}
                              <span>{sub.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
