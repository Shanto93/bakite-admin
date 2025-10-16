/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  useDeleteExecutiveMutation,
  useGetAllExecutivesQuery,
  useGetExecutiveOnBoardedShopsQuery,
  useGetExecutivesByAreaQuery,
  useUpdateExecutiveMutation,
} from "@/redux/api/agent/agentApi";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface IUserData {
  _id: string;
  phone: string;
  name: string;
  avatar: string;
  area: string;
}

export default function AgentsList() {
  const { data: agentData, isLoading, error } = useGetAllExecutivesQuery(undefined);
  const { data: areaData } = useGetExecutivesByAreaQuery({ area: "East - West" });
  const { data: onBoardData } = useGetExecutiveOnBoardedShopsQuery({ phone: "01805960378" });

  const [deleteExecutive] = useDeleteExecutiveMutation();
  const [updateExecutive] = useUpdateExecutiveMutation();

  // Loading states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // ————— Delete —————
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    setDeletingId(id);
    try {
      const result = await deleteExecutive({ id }).unwrap();
      if (!result.error) {
        toast.success(result.message || "Executive deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete executive");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  // ————— Update (hardcoded area) —————
  const handleUpdate = async (id: string, area: string) => {
    setUpdatingId(id);
    try {
      // Backend returns: { error, message, data: IUserData[] }
      const updatedList = await updateExecutive({ id, area }).unwrap();

      // Optional: find updated item in response to show a nicer toast
      const updated = Array.isArray(updatedList)
        ? updatedList.find((u) => u._id === id)
        : undefined;

      toast.success(
        `Area updated to "${area}"` +
          (updated?.name ? ` for ${updated.name}` : "")
      );
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(err?.data?.message || "Failed to update area");
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <p className="text-red-600 dark:text-red-400">Error loading agents data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Agents */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          All Agents ({agentData?.length || 0})
        </h2>

        <div className="space-y-4">
          {agentData && agentData.length > 0 ? (
            agentData.map((agent: IUserData) => (
              <div
                key={agent._id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  {agent.avatar ? (
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-300 font-semibold text-lg">
                        {agent.name?.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                      {agent.name || "Unnamed Agent"}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">📞 {agent.phone}</p>
                    {agent.area && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">📍 {agent.area}</p>
                    )}
                  </div>

                  {/* Update (hardcoded area) */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUpdate(agent._id, "East - West")}
                    disabled={updatingId === agent._id}
                  >
                    {updatingId === agent._id ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Update Area → East - West"
                    )}
                  </Button>

                  {/* Delete */}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(agent._id, agent.name)}
                    disabled={deletingId === agent._id}
                  >
                    {deletingId === agent._id ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent mr-2" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-center py-4">No agents found</p>
          )}
        </div>
      </div>

      {/* Area-Specific Agents */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          East - West Area Agents ({areaData?.length || 0})
        </h2>

        <div className="space-y-4">
          {areaData && areaData.length > 0 ? (
            areaData.map((agent: IUserData) => (
              <div
                key={agent._id}
                className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-green-900/20"
              >
                <div className="flex items-center gap-3">
                  {agent.avatar ? (
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-300 font-semibold text-lg">
                        {agent.name?.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                      {agent.name || "Unnamed Agent"}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">📞 {agent.phone}</p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      📍 {agent.area}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(agent._id, agent.name)}
                    disabled={deletingId === agent._id}
                  >
                    {deletingId === agent._id ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent mr-2" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-center py-4">
              No agents found in East - West area
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
