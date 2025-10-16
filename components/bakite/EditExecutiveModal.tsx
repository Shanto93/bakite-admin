/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect, useRef, useState, useMemo } from "react";
import type { Executive } from "@/app/types/types";
import { useUpdateExecutiveMutation } from "@/redux/api/agent/agentApi";
import { toast } from "sonner";

/** Division + Zone shape for the dropdowns */
type Division = {
  id: number;
  division: string;
  zone: { id: number; division: string }[];
};

type Props = {
  executive: Executive;
  onClose: () => void;
  onSaved: (updated: Executive) => void;
  divisionsData?: Division[];
};

/** Fallback options */
const FALLBACK_DIVISIONS: Division[] = [
  {
    id: 1,
    division: "CTG METRO",
    zone: [
      { id: 1, division: "WEST" },
      { id: 2, division: "EAST" },
      { id: 3, division: "SOUTH" },
      { id: 4, division: "NORTH" },
    ],
  },
];

function parseLocation(raw: string | undefined): { division: string; zone: string } {
  const trimmed = (raw || "").trim();
  const parts = trimmed.split(" - ").map((s) => s.trim());
  if (parts.length >= 2) return { division: parts[0], zone: parts.slice(1).join(" - ") };
  return { division: trimmed || "", zone: "" };
}

export default function EditExecutiveModal({
  executive,
  onClose,
  onSaved,
  divisionsData,
}: Props) {
  const data = divisionsData?.length ? divisionsData : FALLBACK_DIVISIONS;

  const initialParsed = parseLocation(executive.location);
  const [division, setDivision] = useState(initialParsed.division);
  const [zone, setZone] = useState(initialParsed.zone);

  const [updateExecutive, { isLoading: loading }] = useUpdateExecutiveMutation();

  const dialogRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const el = dialogRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    el?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    setZone("");
  }, [division]);

  const selectedDivisionObj = useMemo(
    () => data.find((d) => d.division === division),
    [data, division]
  );
  const zoneOptions = selectedDivisionObj?.zone ?? [];

  const newLocation = useMemo(() => {
    if (division && zone) return `${division} - ${zone}`;
    if (division) return division;
    return "";
  }, [division, zone]);

  const isDirty =
    division !== initialParsed.division || zone !== initialParsed.zone;
  const canSave = isDirty && !!division && !!zone && !loading;

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;

    try {
      const list = await updateExecutive({
        id: executive._id,
        division,
        zone,
      }).unwrap(); // IUserData[]

      const updated = Array.isArray(list)
        ? list.find((u) => u._id === executive._id) || list[0]
        : undefined;

      const merged: Executive = {
        ...executive,
        ...(updated ?? {}),
        location: newLocation || executive.location,
        avatar: updated?.avatar || executive.avatar,
        name: updated?.name ?? executive.name,
        phone: updated?.phone ?? executive.phone,
      };

      toast.success("Executive updated successfully.");
      onSaved(merged);
      onClose();
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || "Update failed";
      toast.error(msg);
      console.error("Update error:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={handleBackdrop}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Executive</h2>
            <p className="text-xs text-gray-500">Update division and zone assignment</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0aa9a2]"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Read-only fields */}
          <Field label="Name">
            <input
              className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-900"
              value={executive.name}
              readOnly
            />
          </Field>
          <Field label="Phone">
            <input
              className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-900"
              value={executive.phone}
              readOnly
            />
          </Field>
          <Field label="ID">
            <input
              className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-900"
              value={executive._id}
              readOnly
            />
          </Field>

          {/* Division */}
          <Field label="Division">
            <div className="relative">
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0aa9a2]"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                required
              >
                <option value="">Select division</option>
                {data.map((d) => (
                  <option key={d.id} value={d.division}>
                    {d.division}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 12l-4-4h8l-4 4z" />
              </svg>
            </div>
          </Field>

          {/* Zone */}
          {division && (
            <Field label="Zone">
              <div className="relative">
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0aa9a2]"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  required
                >
                  <option value="">Select zone</option>
                  {zoneOptions.map((z) => (
                    <option key={z.id} value={z.division}>
                      {z.division}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 12l-4-4h8l-4 4z" />
                </svg>
              </div>
              {division && zone && (
                <p className="text-xs text-gray-500 mt-1">
                  New location: <span className="font-medium">{division} - {zone}</span>
                </p>
              )}
            </Field>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0aa9a2]"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0aa9a2] px-4 py-2 text-sm font-medium text-white hover:bg-[#099791] focus:outline-none focus:ring-2 focus:ring-[#0aa9a2] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!canSave}
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving…
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
