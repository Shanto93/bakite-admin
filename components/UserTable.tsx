import React from "react";
import Image from "next/image";
import { StatusBadge } from "./StatusBadge";
import type { User } from "@/app/types/types";

export const UserTable: React.FC<{ data: User[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-sm text-gray-500">
        No shops found.
      </div>
    );
  }

  // data?.map((data) => console.log(data.picture));

  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Shops</h3>
        <p className="text-sm text-gray-500">{data.length} results</p>
      </div>

      {/* Scroll wrappers */}
      <div className="overflow-x-auto">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold sticky top-0 z-10">
              <tr>
                <th className="p-4 text-left">PICTURE</th>
                <th className="p-4 text-left">NAME</th>
                <th className="p-4 text-left">PHONE</th>
                <th className="p-4 text-left hidden sm:table-cell">LOCATION</th>
                <th className="p-4 text-left">STATUS</th>
                <th className="p-4 text-left whitespace-nowrap hidden md:table-cell">
                  LAST LOGIN
                </th>
                <th className="p-4 text-left whitespace-nowrap hidden md:table-cell">
                  LAST CUSTOMER ADDED TIME
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((user) => (
                <tr key={user.shopId} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    {user.picture ? (
                      <Image
                        src={user.picture}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <Image
                        src="https://i.ibb.co.com/vvkBD8Qx/generated-image-1.jpg"
                        alt={user.name}
                        width={60}
                        height={60}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                  </td>

                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 font-medium whitespace-nowrap">
                    {user.phone}
                  </td>

                  <td className="p-4 font-medium hidden sm:table-cell">
                    {user.shopAddress}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="p-4 whitespace-nowrap hidden md:table-cell">
                    {new Date(user.lastLoginAt).toLocaleString()}
                  </td>

                  <td className="p-4 whitespace-nowrap hidden md:table-cell">
                    {new Date(user.lastConsumerAddedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
