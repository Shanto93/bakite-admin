/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import {
  FiUser,
  FiRefreshCw,
  FiSearch,
  FiMapPin,
  FiAlertTriangle,
  FiPlus,
} from "react-icons/fi";
import ExecutivesClient from "@/components/bakite/ExecutivesClient";
import { useGetAllExecutivesQuery } from "@/redux/api/agent/agentApi";
import type { IUserData } from "@/app/types/types";
import ViewSkeleton from "./ViewSkeleton";

export default function ViewClient() {
  const {
    data: result = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAllExecutivesQuery();

  const [query, setQuery] = React.useState("");
  const [area, setArea] = React.useState("");

  const areas = React.useMemo(() => {
    const s = new Set(result.map((r) => r.location).filter(Boolean));
    return Array.from(s).sort();
  }, [result]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return result.filter((r) => {
      const matchesQuery =
        !q ||
        r.name?.toLowerCase().includes(q) ||
        r.phone?.toLowerCase().includes(q);
      const matchesArea = !area || r.location === area;
      return matchesQuery && matchesArea;
    });
  }, [result, query, area]);

  const softError = isError
    ? ("data" in (error as any) && (error as any).data?.message) ||
      ("status" in (error as any) &&
        `Server responded with status: ${(error as any).status}`) ||
      "Failed to fetch executives"
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl border border-b-0 border-gray-200 px-6 py-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Agent Monitor
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                View and manage all executive users in the system
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0aa9a2]/10 text-[#0aa9a2]">
                {isLoading
                  ? "Loading..."
                  : `${filtered.length} ${
                      filtered.length === 1 ? "User" : "Users"
                    }`}
              </span>

              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition"
                aria-label="Refresh"
              >
                <FiRefreshCw
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <Link
                href="/agent-monitor/create"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0aa9a2] px-3 py-2 text-sm font-medium text-white hover:bg-[#099791] active:scale-[0.98] transition"
              >
                <FiPlus className="h-4 w-4" />
                <span className="hidden sm:inline">New Executive</span>
                <span className="sm:hidden">New</span>
              </Link>
            </div>
          </div>

          {/* Toolbar */}
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative w-full md:w-1/2">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or phone…"
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0aa9a2]"
              />
            </div>

            {/* Area filter */}
            <div className="relative w-full md:w-64">
              <FiMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-9 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0aa9a2]"
              >
                <option value="">All areas</option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 shadow-sm overflow-hidden">
          {/* Loading */}
          {isLoading ? <ViewSkeleton></ViewSkeleton> : null}

          {/* Error */}
          {!isLoading && softError ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <FiAlertTriangle className="h-12 w-12 text-red-400" />
              <h3 className="mt-3 text-base font-semibold text-gray-900">
                Error loading data
              </h3>
              <p className="mt-1 text-sm text-gray-500">{softError}</p>
              <button
                onClick={() => refetch()}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 active:scale-[0.98] transition"
              >
                <FiRefreshCw className="h-4 w-4" />
                Try again
              </button>
            </div>
          ) : null}

          {/* Empty */}
          {!isLoading && !softError && filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <FiUser className="h-12 w-12 text-gray-400" />
              <h3 className="mt-3 text-base font-semibold text-gray-900">
                No executives found
              </h3>
              <p className="mt-1 max-w-md text-sm text-gray-500">
                Try adjusting your search or area filter, or create a new
                executive.
              </p>
              <Link
                href="/agent-monitor/create"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0aa9a2] px-4 py-2 text-sm font-medium text-white hover:bg-[#099791] active:scale-[0.98] transition"
              >
                <FiPlus className="h-4 w-4" />
                Create executive
              </Link>
            </div>
          ) : null}

          {/* Data view — hand off to your existing client table/cards */}
          {!isLoading && !softError && filtered.length > 0 ? (
            <ExecutivesClient initialData={filtered as IUserData[]} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
