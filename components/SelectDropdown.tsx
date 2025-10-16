// "use client";
// import React from "react";

// export type Option = { label: string; value: string };

// interface Props {
//   label: string;
//   options: Option[];
//   value: string;
//   onChange: (v: string) => void;
//   disabled?: boolean;
//   placeholder?: string;
//   className?: string;
// }

// const SelectDropdown: React.FC<Props> = ({
//   label,
//   options,
//   value,
//   onChange,
//   disabled,
//   placeholder = "Select",
//   className = "w-48",
// }) => {
//   return (
//     <div className="flex flex-col space-y-1">
//       <label className="text-sm font-medium text-gray-700">{label}</label>
//       <select
//         className={`${className} rounded-md border border-gray-300 px-3 py-2 focus:border-[#00B3A4] focus:ring-1 focus:ring-[#00B3A4] outline-none`}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         disabled={disabled}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SelectDropdown;



















"use client";
import React from "react";

export type Option = { label: string; value: string };

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  /** Show a spinner inside the control */
  loading?: boolean;
  /** Optional helper text under the control */
  helperText?: string;
  /** Render invalid state */
  error?: string | null;
}

const SelectDropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  disabled,
  placeholder = "Select",
  className = "w-full",
  loading = false,
  helperText,
  error,
}) => {
  const border =
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-200"
      : "border-gray-300 focus:border-[#00B3A4] focus:ring-[#00B3A4]/40";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-800">{label}</label>

      <div className={`relative ${className}`}>
        <select
          className={[
            "w-full appearance-none rounded-lg bg-white px-3 py-2.5 text-sm text-gray-900 outline-none",
            "ring-1 ring-inset focus:ring-2 transition-shadow",
            border,
            disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "",
          ].join(" ")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 12l-4-4h8l-4 4z" />
        </svg>

        {/* Inline spinner */}
        {loading && (
          <svg
            className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V1.5C6.201 1.5 1.5 6.201 1.5 12H4z" />
          </svg>
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default SelectDropdown;
