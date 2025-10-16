/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDeleteExecutiveMutation } from "@/redux/api/agent/agentApi";

interface DeleteButtonProps {
  executiveId: string;
  executiveName: string;
  variant?: "desktop" | "mobile";
  onDeleted?: (id: string) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  executiveId,
  executiveName,
  // variant = "desktop",
  onDeleted,
}) => {
  const router = useRouter();

  const [deleteExecutive, { isLoading }] = useDeleteExecutiveMutation();

  const mountedRef = React.useRef(true);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const confirmDelete = () => {
    toast.warning(`Delete ${executiveName}?`, {
      duration: 5000,
      action: {
        label: "Confirm",
        onClick: performDelete,
      },
    });
  };

  const performDelete = async () => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      toast.error("You're offline. Please check your connection.");
      return;
    }

    const p = deleteExecutive({ id: executiveId }).unwrap();

    toast.promise(p, {
      loading: "Deleting...",
      success: (res: any) => {
        if (res?.error) throw new Error(res.message || "Failed to delete.");
        onDeleted?.(executiveId);
        router.refresh();
        return `${executiveName} deleted successfully!`;
      },
      error: (err: any) =>
        err?.data?.message || err?.message || "Failed to delete. Try again.",
    });

    try {
      await p;
    } catch {}
  };

  const buttonClasses =
    "inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      onClick={confirmDelete}
      disabled={isLoading}
      className={buttonClasses}
      aria-label={`Delete ${executiveName}`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-sm">Deleting...</span>
        </>
      ) : (
        <>
          <FiTrash2 className="h-4 w-4" />
          <span className="text-sm">Delete</span>
        </>
      )}
    </button>
  );
};