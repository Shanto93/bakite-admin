/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import SelectDropdown, { type Option } from "@/components/SelectDropdown";
import { UserTable } from "@/components/UserTable";
import {
  useGetExecutivesByAreaQuery,
  useGetExecutiveOnBoardedShopsQuery,
} from "@/redux/api/agent/agentApi";
import type { IOnBoarded, User } from "@/app/types/types";

const divisionOptions: Option[] = [{ label: "CTG METRO", value: "CTG METRO" }];

const zoneOptions: Option[] = [
  { label: "East", value: "EAST" },
  { label: "West", value: "WEST" },
  { label: "South", value: "SOUTH" },
  { label: "North", value: "NORTH" },
];

export default function PerformanceZone() {
  const [division, setDivision] = useState("");
  const [zone, setZone] = useState("");
  const [agentPhone, setAgentPhone] = useState("");

  useEffect(() => {
    setAgentPhone("");
  }, [division, zone]);

  const {
    data: agents = [],
    isFetching: loadingAgents,
    isError: isAgentsError,
    error: agentsErrorObj,
    refetch: refetchAgents,
  } = useGetExecutivesByAreaQuery(
    {
      division: division as "CTG METRO",
      zone: zone as "EAST" | "WEST" | "SOUTH" | "NORTH",
    },
    { skip: !division || !zone }
  );

  const agentOptions: Option[] = useMemo(
    () =>
      (agents ?? []).map((a) => ({
        label: `${a.name} (${a.phone})`,
        value: a.phone,
      })),
    [agents]
  );

  const {
    data: onboardedRaw = [],
    isFetching: loadingUsers,
    isError: isUsersError,
    error: usersErrorObj,
    refetch: refetchUsers,
  } = useGetExecutiveOnBoardedShopsQuery(
    { phone: agentPhone },
    { skip: !agentPhone }
  );

  const onboardedArray: IOnBoarded[] = useMemo(() => {
    if (Array.isArray(onboardedRaw)) return onboardedRaw as IOnBoarded[];
    return onboardedRaw ? [onboardedRaw as IOnBoarded] : [];
  }, [onboardedRaw]);

  const users: User[] = useMemo(() => {
    return onboardedArray.map((u) => ({
      shopId: u.shopId,
      phone: u.phone,
      name: u.name,
      picture: u.picture,
      shopName: u.shopName,
      shopAddress: u.shopAddress,
      shopPicture: u.shopPicture,
      status:
        (typeof u.status === "string" ? u.status : String(u.status)) as
          | "Inactive"
          | "Active",
      lastLoginAt:
        typeof u.lastLoginAt === "string"
          ? u.lastLoginAt
          : new Date(u.lastLoginAt).toISOString(),
      lastConsumerAddedAt:
        typeof u.lastConsumerAddedAt === "string"
          ? u.lastConsumerAddedAt
          : new Date(u.lastConsumerAddedAt).toISOString(),
    }));
  }, [onboardedArray]);

  const totalUsers = users.length;
  const showEmptyBanner = agentPhone && !loadingUsers && totalUsers === 0;

  const error =
    (isAgentsError &&
      ((agentsErrorObj as any)?.data?.message ||
        (agentsErrorObj as any)?.message ||
        "Failed to load executives")) ||
    (isUsersError &&
      ((usersErrorObj as any)?.data?.message ||
        (usersErrorObj as any)?.message ||
        "Failed to load shops")) ||
    null;

  const hasFilters = !!division || !!zone || !!agentPhone;

  const resetFilters = () => {
    setDivision("");
    setZone("");
    setAgentPhone("");
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Header / Toolbar */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Performance • Zone</h2>
            <p className="text-sm text-gray-500">
              Select division and zone to load executives, then pick an executive to view onboarded shops.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0aa9a2]/10 px-3 py-1 text-sm font-medium text-[#0aa9a2]">
              {loadingUsers ? "Loading…" : `${totalUsers} ${totalUsers === 1 ? "User" : "Users"}`}
            </span>

            <button
              onClick={() => {
                if (division && zone) refetchAgents();
                if (agentPhone) refetchUsers();
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition"
            >
              <svg
                className={`h-4 w-4 ${loadingUsers || loadingAgents ? "animate-spin" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 4v6h6M20 20v-6h-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 8a8 8 0 10-7.5 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Refresh
            </button>

            <button
              onClick={resetFilters}
              disabled={!hasFilters}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {/* Division */}
          <SelectDropdown
            label="Division"
            options={divisionOptions}
            value={division}
            onChange={setDivision}
            placeholder="Select division"
            helperText="Pick division first."
          />

          {/* Zone */}
          <SelectDropdown
            label="Zone"
            options={zoneOptions}
            value={zone}
            onChange={setZone}
            placeholder={division ? "Select zone" : "Pick division first"}
            disabled={!division}
            helperText={division ? "Now choose zone." : "Division is required."}
          />

          {/* Executive (loads after both division & zone) */}
          <SelectDropdown
            label="Executive"
            options={agentOptions}
            value={agentPhone}
            onChange={setAgentPhone}
            disabled={loadingAgents || !division || !zone}
            placeholder={
              !division || !zone
                ? "Pick division & zone first"
                : loadingAgents
                ? "Loading…"
                : agents.length
                ? "Select executive"
                : "No executives found"
            }
            loading={loadingAgents}
            helperText={
              division && zone
                ? "Choose an executive for the selected area."
                : "Division & zone are required."
            }
            className="w-full"
          />
        </div>

        {showEmptyBanner && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            No onboarded shops found
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {loadingUsers ? (
        <ListSkeleton />
      ) : agentPhone ? (
        totalUsers > 0 ? (
          <UserTable data={users} />
        ) : (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-sm text-gray-500">
            No users found for the selected executive.
          </div>
        )
      ) : (
        <div className="mt-2 text-sm text-gray-500">Select an executive to view users.</div>
      )}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="mt-6 space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
          <div className="h-4 w-1/3 bg-gray-100 rounded mb-2" />
          <div className="h-3 w-2/3 bg-gray-100 rounded mb-2" />
          <div className="h-3 w-1/2 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}
