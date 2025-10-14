"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FiUser,
  FiPhone,
  FiUpload,
  FiX,
  FiCheck,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";
import Image from "next/image";
import type { FormData } from "@/app/types/types";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const watchedFile = watch("file");

  const areaOptions = ["CTG Metro", "East - West"];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("area", data.area);

      if (data.file?.[0]) {
        formData.append("avatar", data.file[0]);
      }

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/executive/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      const clonedResponse = response.clone();

      if (!response.ok) {
        let errorMessage = "Submission failed";

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          try {
            const errorText = await clonedResponse.text();
            console.error("Server returned non-JSON error:", errorText);
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          } catch {
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          }
        }

        throw new Error(errorMessage);
      }

      await response.json();

      alert("User creation successful!");
      reset();
      setSelectedFileName("");
      setPreviewUrl("");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "User creation failed. Please try again.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const file = watchedFile?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFileName(file.name);
      return () => URL.revokeObjectURL(url);
    } else if (file) {
      setSelectedFileName(file.name);
      setPreviewUrl("");
    }
  }, [watchedFile]);

  const clearFile = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reset({ file: undefined as any });
    setSelectedFileName("");
    setPreviewUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-t-xl border-b border-gray-200 px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create New User
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Add a new executive user to the system
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0aa9a2]/10">
                <FiUser className="w-6 h-6 text-[#0aa9a2]" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-b-xl shadow-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-8 sm:px-8 space-y-6"
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`block w-full pl-10 pr-3 py-2.5 border ${
                    errors.name
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-[#0aa9a2] focus:border-[#0aa9a2]"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="01000000000"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^(\+?88)?01[3-9]\d{8}$/,
                      message: "Please enter a valid Bangladesh phone number",
                    },
                    minLength: {
                      value: 11,
                      message: "Phone number must be 11 digits",
                    },
                    maxLength: {
                      value: 14,
                      message: "Phone number must not exceed 14 digits",
                    },
                  })}
                  className={`block w-full pl-10 pr-3 py-2.5 border ${
                    errors.phone
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-[#0aa9a2] focus:border-[#0aa9a2]"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                  {errors.phone.message}
                </p>
              )}
              <p className="mt-1.5 text-xs text-gray-500">
                Format: 01XXXXXXXXX (11 digits)
              </p>
            </div>

            {/* Area Dropdown Field */}
            <div>
              <label
                htmlFor="area"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Area <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="area"
                  {...register("area", {
                    required: "Please select an area",
                  })}
                  className={`block w-full pl-10 pr-10 py-2.5 border ${
                    errors.area
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-[#0aa9a2] focus:border-[#0aa9a2]"
                  } rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an area
                  </option>
                  {areaOptions.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.area && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                  {errors.area.message}
                </p>
              )}
            </div>            

            {/* File Upload Field */}
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Profile Picture <span className="text-red-500">*</span>
              </label>

              {!selectedFileName ? (
                <label
                  htmlFor="file"
                  className={`flex flex-col items-center justify-center w-full h-36 border-2 ${
                    errors.file
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  } border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-1 text-sm text-gray-600 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF or DOC (Max 5MB)
                    </p>
                  </div>
                  <input
                    id="file"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    {...register("file", {
                      required: "File is required",
                      validate: {
                        fileSize: (files) =>
                          files[0]?.size <= 5000000 ||
                          "File size must be less than 5MB",
                      },
                    })}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start gap-4">
                    {previewUrl && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="80px"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {selectedFileName}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <FiCheck className="w-3 h-3 text-green-500" />
                            File uploaded successfully
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={clearFile}
                          className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 transition-colors"
                          aria-label="Remove file"
                        >
                          <FiX className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {errors.file && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                  {errors.file.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  clearFile();
                }}
                disabled={isLoading}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0aa9a2] text-white font-medium rounded-lg hover:bg-[#099791] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0aa9a2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
