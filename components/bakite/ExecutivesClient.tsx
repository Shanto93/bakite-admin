"use client";

import * as React from "react";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import type { Executive } from "@/app/types/types";
import { DeleteButton } from "@/components/bakite/DeleteButton";
import EditExecutiveModal from "./EditExecutiveModal";

type Props = {
  initialData: Executive[];
};

function normalizeImgSrc(raw?: string): string | null {
  const val = (raw || "").trim();
  if (!val) return null;
  if (/^https?:\/\//i.test(val)) return val;
  if (val.startsWith("/public/")) return val.replace(/^\/?public\//, "/");
  if (val.startsWith("public/")) return `/${val.replace(/^public\//, "")}`;
  if (val.startsWith("/")) return val;
  return `/${val}`;
}

export default function ExecutivesClient({ initialData }: Props) {
  const router = useRouter();
  const [rows, setRows] = React.useState<Executive[]>(initialData);
  const [editing, setEditing] = React.useState<Executive | null>(null);
  const [imgVersion, setImgVersion] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    setRows(initialData);
  }, [initialData]);

  const onSaved = (updated: Executive) => {
    setRows(prev =>
      prev.map(r => {
        if (r._id !== updated._id) return r;
        const incomingAvatar = (updated.avatar || "").trim();
        const safeAvatar = incomingAvatar ? incomingAvatar : r.avatar;
        return { ...r, ...updated, avatar: safeAvatar, name: updated.name ?? r.name, phone: updated.phone ?? r.phone };
      })
    );
    setImgVersion(prev => ({ ...prev, [updated._id]: (prev[updated._id] || 0) + 1 }));
    router.refresh();
  };

  const onDeleted = React.useCallback(
    (deletedId: string) => {
      setRows(prev => prev.filter(r => r._id !== deletedId));
      if (editing && editing._id === deletedId) setEditing(null);
    },
    [editing]
  );

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>User</Th>
              <Th>Phone</Th>
              <Th>Location</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map(executive => {
              const v = imgVersion[executive._id] || 0;
              const imgSrc = normalizeImgSrc(executive.avatar);
              const srcWithBuster = imgSrc ? `${imgSrc}${imgSrc.includes("?") ? "&" : "?"}v=${v}` : null;

              return (
                <tr key={executive._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 relative flex-shrink-0">
                        {srcWithBuster ? (
                          <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200">
                            <Image
                              key={`${executive._id}-${executive.avatar ?? "noavatar"}-${v}`}
                              src={srcWithBuster}
                              alt={executive.name || "Executive avatar"}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-[#0aa9a2]/10 flex items-center justify-center">
                            <span className="text-[#0aa9a2] font-medium text-sm">
                              {executive.name?.charAt(0)?.toUpperCase() ?? "?"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{executive.name}</div>
                        <div className="text-sm text-gray-500">ID: {executive._id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{executive.phone}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {executive.location}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditing(executive)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0aa9a2] transition-colors"
                        aria-label={`Edit ${executive.name}`}
                      >
                        <FiEdit2 className="h-4 w-4" />
                        <span className="text-sm">Edit</span>
                      </button>

                      <DeleteButton
                        executiveId={executive._id}
                        executiveName={executive.name}
                        variant="desktop"
                        onDeleted={onDeleted}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {rows.map(executive => {
          const v = imgVersion[executive._id] || 0;
          const imgSrc = normalizeImgSrc(executive.avatar);
          const srcWithBuster = imgSrc ? `${imgSrc}${imgSrc.includes("?") ? "&" : "?"}v=${v}` : null;

          return (
            <div key={executive._id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {srcWithBuster ? (
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        key={`${executive._id}-${executive.avatar ?? "noavatar"}-${v}`}
                        src={srcWithBuster}
                        alt={executive.name || "Executive avatar"}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-[#0aa9a2]/10 flex items-center justify-center">
                      <span className="text-[#0aa9a2] font-medium text-lg">
                        {executive.name?.charAt(0)?.toUpperCase() ?? "?"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{executive.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{executive.phone}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex-shrink-0">
                      {executive.location}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mt-1">ID: {executive._id}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => setEditing(executive)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0aa9a2] transition-colors text-sm"
                      aria-label={`Edit ${executive.name}`}
                    >
                      <FiEdit2 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>

                    <DeleteButton
                      executiveId={executive._id}
                      executiveName={executive.name}
                      variant="mobile"
                      onDeleted={onDeleted}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {editing && (
        <EditExecutiveModal
          executive={editing}
          onClose={() => setEditing(null)}
          onSaved={onSaved}
        />
      )}
    </>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  const alignClass = align === "right" ? "text-right" : "text-left";
  return (
    <th
      scope="col"
      className={`px-6 py-3 ${alignClass} text-xs font-semibold text-gray-700 uppercase tracking-wider`}
    >
      {children}
    </th>
  );
}
