"use client";

import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const confirmDelete = () => {
    toast.warning(`Delete ${executiveName}?`, {
      action: {
        label: "Confirm",
        onClick: performDelete,
      },
      duration: 5000,
    });
  };

  const performDelete = async () => {
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
      if (!baseUrl) throw new Error("API base URL not configured");

      const response = await fetch(`${baseUrl}/executive/delete/${executiveId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed (status: ${response.status})`);
      }

      toast.success(`${executiveName} deleted successfully!`);

      onDeleted?.(executiveId);
      router.refresh();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to delete. Try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const buttonClasses =
    "inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      onClick={confirmDelete}
      disabled={isDeleting}
      className={buttonClasses}
      aria-label={`Delete ${executiveName}`}
    >
      {isDeleting ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 
                 5.373 0 12h4zm2 5.291A7.962 7.962 
                 0 014 12H0c0 3.042 1.135 5.824 
                 3 7.938l3-2.647z"
            ></path>
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
