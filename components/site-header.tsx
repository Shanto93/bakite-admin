"use client";

import { FiRefreshCw } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetAllConsumersQuery } from "@/redux/api/agent/agentApi";

export function SiteHeader() {
  const { refetch, isFetching } = useGetAllConsumersQuery();

  const handleRefresh = async () => {
    await refetch();
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isFetching}
            className="inline-flex items-center gap-2 border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition"
          >
            <FiRefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">
              {isFetching ? "Refreshing…" : "Refresh"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
