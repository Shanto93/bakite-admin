/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useState } from "react";
import type { Executive } from "@/app/types/types";

type Props = {
  executive: Executive;
  onClose: () => void;
  onSaved: (updated: Executive) => void;
};

const AREA_OPTIONS = ["CTG Metro", "East - West"] as const;

export default function EditExecutiveModal({ executive, onClose, onSaved }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API!;
  const [area, setArea] = useState<string>(executive.area ?? "");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/executive/update/${executive._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed with status ${res.status}`);
      }

      const json = await res.json();
      const updated = (Array.isArray(json?.data) ? json.data[0] : json?.data) as Partial<Executive> | undefined;
      if (!updated) throw new Error("Malformed server response");

      const incomingAvatar = ((updated as any)?.avatar || "").trim();
      const safeAvatar = incomingAvatar ? incomingAvatar : executive.avatar; // <- preserve previous avatar

     
      const merged: Executive = {
        ...executive,
        ...updated,
        area,
        avatar: safeAvatar,
        name: (updated as any)?.name ?? executive.name,
        phone: (updated as any)?.phone ?? executive.phone,
      };

      onSaved(merged);
      onClose();
    } catch (e: any) {
      setErr(e?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Edit Executive</h2>
          <p className="text-xs text-gray-500">Only the area is editable</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Read-only fields */}
          <Field label="Name">
            <input className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm" value={executive.name} readOnly />
          </Field>
          <Field label="Phone">
            <input className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm" value={executive.phone} readOnly />
          </Field>
          <Field label="ID">
            <input className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm" value={executive._id} readOnly />
          </Field>

          {/* Editable: Area as dropdown */}
          <Field label="Area (editable)">
            <select
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0aa9a2] bg-white"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            >
              <option value="" disabled>
                Select area
              </option>
              {AREA_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>

          {err && <p className="text-sm text-red-600">{err}</p>}
        </form>

        <div className="flex items-center justify-end gap-2 border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            formAction="submit"
            onClick={handleSubmit as any}
            className="rounded-lg bg-[#0aa9a2] px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
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
