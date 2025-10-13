// "use client"
// import React, { useState } from "react";

// // Define interfaces for type safety
// interface Zone {
//   id: number;
//   name: string;
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   department: string;
// }

// interface UsersData {
//   [key: number]: User[];
// }

// const ZonePage: React.FC = () => {
//   // Sample data - replace with your actual data
//   const zones: Zone[] = [
//     { id: 1, name: "North Zone" },
//     { id: 2, name: "South Zone" },
//     { id: 3, name: "East Zone" },
//     { id: 4, name: "West Zone" },
//   ];

//   const usersData: UsersData = {
//     1: [
//       { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890", role: "Manager", department: "Sales" },
//       { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1234567891", role: "Developer", department: "Engineering" },
//       { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1234567892", role: "Designer", department: "Design" },
//     ],
//     2: [
//       { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "+1234567893", role: "Analyst", department: "Finance" },
//       { id: 5, name: "Tom Brown", email: "tom@example.com", phone: "+1234567894", role: "Coordinator", department: "Operations" },
//     ],
//     3: [
//       { id: 6, name: "Emily Davis", email: "emily@example.com", phone: "+1234567895", role: "Lead", department: "Marketing" },
//       { id: 7, name: "Chris Wilson", email: "chris@example.com", phone: "+1234567896", role: "Specialist", department: "HR" },
//     ],
//     4: [
//       { id: 8, name: "Lisa Anderson", email: "lisa@example.com", phone: "+1234567897", role: "Manager", department: "Support" },
//     ],
//   };

//   const [selectedZone, setSelectedZone] = useState<number>(1);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   const currentUsers: User[] = usersData[selectedZone] || [];

//   const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
//     setSelectedZone(Number(e.target.value));
//     setSelectedUser(null);
//   };

//   const handleUserClick = (user: User): void => {
//     setSelectedUser(user);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Left Section */}
//       <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
//         {/* Dropdown Section */}
//         <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//           <label 
//             htmlFor="zone-select" 
//             className="block text-sm font-semibold text-gray-700 mb-3"
//           >
//             Select Zone
//           </label>
//           <select
//             id="zone-select"
//             value={selectedZone}
//             onChange={handleZoneChange}
//             className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-blue-400"
//           >
//             {zones.map((zone: Zone) => (
//               <option key={zone.id} value={zone.id}>
//                 {zone.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* User List Section */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="p-4">
//             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
//               Users ({currentUsers.length})
//             </h3>
//             <ul className="space-y-2">
//               {currentUsers.map((user: User) => (
//                 <li key={user.id}>
//                   <button
//                     onClick={() => handleUserClick(user)}
//                     className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
//                       selectedUser?.id === user.id
//                         ? "bg-blue-500 text-white shadow-md transform scale-[1.02]"
//                         : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm"
//                     }`}
//                   >
//                     <div className="font-medium">{user.name}</div>
//                     <div
//                       className={`text-sm mt-1 ${
//                         selectedUser?.id === user.id
//                           ? "text-blue-100"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {user.role}
//                     </div>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex-1 p-8 overflow-y-auto">
//         {selectedUser ? (
//           <div className="max-w-2xl mx-auto">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               {/* Header */}
//               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
//                 <h2 className="text-3xl font-bold text-white mb-2">
//                   {selectedUser.name}
//                 </h2>
//                 <p className="text-blue-100">{selectedUser.role}</p>
//               </div>

//               {/* User Details */}
//               <div className="p-8 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
//                       Email
//                     </label>
//                     <p className="text-gray-900 font-medium flex items-center">
//                       <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       {selectedUser.email}
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
//                       Phone
//                     </label>
//                     <p className="text-gray-900 font-medium flex items-center">
//                       <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       {selectedUser.phone}
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
//                       Department
//                     </label>
//                     <p className="text-gray-900 font-medium flex items-center">
//                       <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                       </svg>
//                       {selectedUser.department}
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
//                       User ID
//                     </label>
//                     <p className="text-gray-900 font-medium flex items-center">
//                       <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//                       </svg>
//                       #{selectedUser.id}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-6 border-t border-gray-200">
//                   <button 
//                     type="button"
//                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
//                   >
//                     Edit Profile
//                   </button>
//                   <button 
//                     type="button"
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
//                   >
//                     View Activity
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <div className="text-center">
//               <svg
//                 className="w-24 h-24 mx-auto text-gray-300 mb-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 No User Selected
//               </h3>
//               <p className="text-gray-500">
//                 Select a user from the list to view their details
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ZonePage;




































"use client"
import React, { useState } from "react";

// Define interfaces for type safety
interface Zone {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
}

interface UsersData {
  [key: number]: User[];
}

const ZonePage: React.FC = () => {
  // Sample data - replace with your actual data
  const zones: Zone[] = [
    { id: 1, name: "North Zone" },
    { id: 2, name: "South Zone" },
    { id: 3, name: "East Zone" },
    { id: 4, name: "West Zone" },
  ];

  const usersData: UsersData = {
    1: [
      { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890", role: "Manager", department: "Sales" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1234567891", role: "Developer", department: "Engineering" },
      { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1234567892", role: "Designer", department: "Design" },
    ],
    2: [
      { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "+1234567893", role: "Analyst", department: "Finance" },
      { id: 5, name: "Tom Brown", email: "tom@example.com", phone: "+1234567894", role: "Coordinator", department: "Operations" },
    ],
    3: [
      { id: 6, name: "Emily Davis", email: "emily@example.com", phone: "+1234567895", role: "Lead", department: "Marketing" },
      { id: 7, name: "Chris Wilson", email: "chris@example.com", phone: "+1234567896", role: "Specialist", department: "HR" },
    ],
    4: [
      { id: 8, name: "Lisa Anderson", email: "lisa@example.com", phone: "+1234567897", role: "Manager", department: "Support" },
    ],
  };

  const [selectedZone, setSelectedZone] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const currentUsers: User[] = usersData[selectedZone] || [];

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedZone(Number(e.target.value));
    setSelectedUser(null);
  };

  const handleUserClick = (user: User): void => {
    setSelectedUser(user);
    // Close mobile sidebar when user is selected
    setIsMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = (): void => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Mobile Header with Hamburger Menu */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-800">Zone Management</h1>
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Left Section - Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-40
          w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4
          bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          h-screen lg:h-auto
        `}
      >
        {/* Dropdown Section */}
        <div className="p-4 sm:p-6 border-b border-[#0aa9a2] bg-[#0aa9a2]/30">
          <label
            htmlFor="zone-select"
            className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3"
          >
            Select Zone
          </label>
          <select
            id="zone-select"
            value={selectedZone}
            onChange={handleZoneChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-blue-400"
          >
            {zones.map((zone: Zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>

        {/* User List Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-4">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 sm:mb-3 px-2">
              Users ({currentUsers.length})
            </h3>
            <ul className="space-y-2">
              {currentUsers.map((user: User) => (
                <li key={user.id}>
                  <button
                    onClick={() => handleUserClick(user)}
                    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                      selectedUser?.id === user.id
                        ? "bg-[#0aa9a2]/50 text-white shadow-md transform scale-[1.02]"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm active:bg-gray-200"
                    }`}
                  >
                    <div className="font-medium text-sm sm:text-base">{user.name}</div>
                    <div
                      className={`text-xs sm:text-sm mt-1 ${
                        selectedUser?.id === user.id
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {user.role}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Section - User Details */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {selectedUser ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0aa9a2] to-white px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                  {selectedUser.name}
                </h2>
                <p className="text-sm sm:text-base text-blue-100">{selectedUser.role}</p>
              </div>

              {/* User Details */}
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Email
                    </label>
                    <p className="text-sm sm:text-base text-gray-900 font-medium flex items-center break-all">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="break-words">{selectedUser.email}</span>
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Phone
                    </label>
                    <p className="text-sm sm:text-base text-gray-900 font-medium flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {selectedUser.phone}
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Department
                    </label>
                    <p className="text-sm sm:text-base text-gray-900 font-medium flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {selectedUser.department}
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      User ID
                    </label>
                    <p className="text-sm sm:text-base text-gray-900 font-medium flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      #{selectedUser.id}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="flex-1 bg-[#0aa9a2]/70 hover:bg-[#0aa9a2]/80 active:bg-[#0aa9a2]/90 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    View Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <div className="text-center px-4">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto text-gray-300 mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                No User Selected
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                {isMobileSidebarOpen ? 'Choose a user to view details' : 'Select a user from the list to view their details'}
              </p>
              <button
                onClick={toggleMobileSidebar}
                className="lg:hidden mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Open Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZonePage;
