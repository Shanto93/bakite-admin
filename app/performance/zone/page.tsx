/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import SelectDropdown, { type Option } from "@/components/SelectDropdown";
import { UserTable } from "@/components/UserTable";
import { getAgentsByArea, getOnboardShops } from "@/lib/api";

type ShopUser = {
  shopId: string;
  phone: string;
  name: string;
  picture: string;
  shopName: string;
  shopAddress: string;
  shopPicture: string;
  status: "Inactive" | "Active";
  lastLoginAt: string;
  lastConsumerAddedAt: string;
};

const zoneOptions: Option[] = [
  { label: "CTG Metro", value: "CTG Metro" },
  { label: "East - West", value: "East - West" },
];

const daysOptions: Option[] = [
  { label: "Last 7 Days", value: "7" },
  { label: "Last 30 Days", value: "30" },
  { label: "All Time", value: "" },
];

export default function PerformanceZone() {
  const [area, setArea] = useState("");
  const [days, setDays] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentOptions, setAgentOptions] = useState<Option[]>([]);
  const [usersRaw, setUsersRaw] = useState<ShopUser[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAgentPhone("");
    setUsersRaw([]);
  }, [area, days]);

  useEffect(() => {
    if (!area || days === null) return;
    if (!area || days === "") {
      if (!area) return;
    }

    (async () => {
      try {
        setLoadingAgents(true);
        setError(null);
        const res = await getAgentsByArea(area);
        const opts =
          res?.data?.map((a) => ({
            label: a.name,
            value: a.phone,
          })) ?? [];
        setAgentOptions(opts);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load agents");
        setAgentOptions([]);
      } finally {
        setLoadingAgents(false);
      }
    })();
  }, [area, days]);

  useEffect(() => {
    if (!agentPhone) return;

    (async () => {
      try {
        setLoadingUsers(true);
        setError(null);
        const res = await getOnboardShops(agentPhone);
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setUsersRaw(data.filter(Boolean) as ShopUser[]);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load users");
        setUsersRaw([]);
      } finally {
        setLoadingUsers(false);
      }
    })();
  }, [agentPhone]);

  const users = useMemo(() => {
    if (!days) return usersRaw;
    const n = Number(days);
    if (!n) return usersRaw;
    const from = Date.now() - n * 24 * 60 * 60 * 1000;
    return usersRaw.filter((u) => new Date(u.lastLoginAt).getTime() >= from);
  }, [usersRaw, days]);

  return (
    <div className="p-8 w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Performance • Zone
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
          <SelectDropdown
            label="ZONE"
            options={zoneOptions}
            value={area}
            onChange={setArea}
          />

          <SelectDropdown
            label="Time Range"
            options={daysOptions}
            value={days}
            onChange={setDays}
          />

          <SelectDropdown
            label="AGENT"
            options={agentOptions}
            value={agentPhone}
            onChange={setAgentPhone}
            disabled={loadingAgents || !area}
            placeholder={loadingAgents ? "Loading…" : "Select"}
            className="w-64"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {loadingUsers ? (
        <div className="mt-6 text-sm text-gray-600">Loading users…</div>
      ) : agentPhone ? (
        users.length > 0 ? (
          <UserTable data={users} />
        ) : (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-sm text-gray-500">
            No users found.
          </div>
        )
      ) : (
        <div className="mt-2 text-sm text-gray-500">
          Select an agent to view users.
        </div>
      )}
    </div>
  );
}
