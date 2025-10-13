// import React from "react";
// import { FiUser } from "react-icons/fi";
// import type { Executive } from "@/app/types/types";
// import ExecutivesClient from "@/components/bakite/ExecutivesClient";


// const View = async () => {
//   let result: Executive[] = [];
//   let error: string | null = null;

//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
//     if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_API environment variable is not defined");

//     const res = await fetch(`${baseUrl}/executive/get-all`, { cache: "no-store" });
//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error("Server error response:", errorText);
//       throw new Error(`Server responded with status: ${res.status}`);
//     }

//     const contentType = res.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const text = await res.text();
//       console.error("Non-JSON response:", text);
//       throw new Error("Server did not return JSON");
//     }

//     const data = await res.json();
//     result = Array.isArray(data) ? data : data.data || [];
//   } catch (err) {
//     error = err instanceof Error ? err.message : "Failed to fetch executives";
//     console.error("Error fetching executives:", err);
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-t-xl border-b border-gray-200 px-6 py-5 sm:px-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Agent Monitor</h1>
//               <p className="mt-1 text-sm text-gray-500">View and manage all executive users in the system</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0aa9a2]/10 text-[#0aa9a2]">
//                 {result.length} Total Users
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="bg-white rounded-b-xl shadow-sm overflow-hidden">
//           {error ? (
//             <div className="text-center py-12">
//               <div className="mx-auto h-12 w-12 text-red-400 flex items-center justify-center">
//                 <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//               </div>
//               <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Data</h3>
//               <p className="mt-1 text-sm text-gray-500">{error}</p>
//             </div>
//           ) : result.length === 0 ? (
//             <div className="text-center py-12">
//               <FiUser className="mx-auto h-12 w-12 text-gray-400" />
//               <h3 className="mt-2 text-sm font-medium text-gray-900">No executives found</h3>
//               <p className="mt-1 text-sm text-gray-500">Get started by creating a new executive user.</p>
//             </div>
//           ) : (
//             <ExecutivesClient initialData={result} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default View;




/****************************************** */

// app/agent-monitor/view/page.tsx
export const dynamic = "force-dynamic";   // <- tell Next not to prerender this route
// (equivalent choices: export const revalidate = 0; or export const fetchCache = "force-no-store")

import React from "react";
import { FiUser } from "react-icons/fi";
import type { Executive } from "@/app/types/types";
import ExecutivesClient from "@/components/bakite/ExecutivesClient";

export default async function View() {
  let result: Executive[] = [];
  let error: string | null = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_API is not defined");

    const res = await fetch(`${baseUrl}/executive/get-all`, {
      cache: "no-store",                
      next: { revalidate: 0 },    
    });

    if (!res.ok) {
      // Don't throw out of the page – keep soft error UI
      const errorText = await res.text().catch(() => "");
      console.error("Server error response:", errorText || res.statusText);
      error = `Server responded with status: ${res.status}`;
    } else {
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text().catch(() => "");
        console.error("Non-JSON response:", text);
        error = "Server did not return JSON";
      } else {
        const data = await res.json();
        result = Array.isArray(data) ? data : data.data || [];
      }
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch executives";
    console.error("Error fetching executives:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl border-b border-gray-200 px-6 py-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agent Monitor</h1>
              <p className="mt-1 text-sm text-gray-500">View and manage all executive users in the system</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0aa9a2]/10 text-[#0aa9a2]">
                {result.length} Total Users
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white rounded-b-xl shadow-sm overflow-hidden">
          {error ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-red-400 flex items-center justify-center">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Data</h3>
              <p className="mt-1 text-sm text-gray-500">{error}</p>
            </div>
          ) : result.length === 0 ? (
            <div className="text-center py-12">
              <FiUser className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No executives found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new executive user.</p>
            </div>
          ) : (
            <ExecutivesClient initialData={result} />
          )}
        </div>
      </div>
    </div>
  );
}
