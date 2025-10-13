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
}

const SelectDropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  disabled,
  placeholder = "Select",
  className = "w-48",
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        className={`${className} rounded-md border border-gray-300 px-3 py-2 focus:border-[#00B3A4] focus:ring-1 focus:ring-[#00B3A4] outline-none`}
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
    </div>
  );
};

export default SelectDropdown;
