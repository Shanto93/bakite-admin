import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const CheckingPage = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;
  
  console.log(session);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Role-Based Testing Page
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Content visibility based on user role: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{role}</span>
          </p>
        </div>

        {/* Role Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700">
            Current Role: {role || "Not Authenticated"}
          </span>
        </div>

        {/* SUPER_ADMIN Tasks */}
        {role === "SUPER_ADMIN" && (
          <div className="space-y-6">
            <TaskCard
              title="Super Admin Tasks"
              icon="👑"
              tasks={[
                "Manage all system settings",
                "View and modify all user accounts",
                "Access system analytics and logs",
                "Configure security policies",
                "Manage database backups"
              ]}
              color="purple"
            />
            <TaskCard
              title="Admin Tasks"
              icon="🛡️"
              tasks={[
                "Manage team members",
                "Review and approve content",
                "Monitor user activities",
                "Generate reports"
              ]}
              color="blue"
            />
            <TaskCard
              title="Management Tasks"
              icon="📊"
              tasks={[
                "View dashboard analytics",
                "Create and assign tasks",
                "Track project progress",
                "Access team reports"
              ]}
              color="green"
            />
          </div>
        )}

        {/* ADMIN Tasks */}
        {role === "ADMIN" && (
          <div className="space-y-6">
            <TaskCard
              title="Admin Tasks"
              icon="🛡️"
              tasks={[
                "Manage team members",
                "Review and approve content",
                "Monitor user activities",
                "Generate reports",
                "Handle user permissions"
              ]}
              color="blue"
            />
            <TaskCard
              title="Management Tasks"
              icon="📊"
              tasks={[
                "View dashboard analytics",
                "Create and assign tasks",
                "Track project progress",
                "Access team reports"
              ]}
              color="green"
            />
          </div>
        )}

        {/* MANAGEMENT Tasks */}
        {role === "MANAGEMENT" && (
          <div className="space-y-6">
            <TaskCard
              title="Management Tasks"
              icon="📊"
              tasks={[
                "View dashboard analytics",
                "Create and assign tasks",
                "Track project progress",
                "Access team reports",
                "Review team performance",
                "Schedule meetings"
              ]}
              color="green"
            />
          </div>
        )}

        {/* No Role/Not Authenticated */}
        {!role && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">
              Access Denied
            </h3>
            <p className="text-red-600 dark:text-red-400">
              You must be authenticated to view this page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// TaskCard Component
interface TaskCardProps {
  title: string;
  icon: string;
  tasks: string[];
  color: "purple" | "blue" | "green";
}

const TaskCard = ({ title, icon, tasks, color }: TaskCardProps) => {
  const colorClasses = {
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
      icon: "bg-purple-100 dark:bg-purple-900/50",
      text: "text-purple-800 dark:text-purple-300",
      badge: "bg-purple-500 dark:bg-purple-600"
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: "bg-blue-100 dark:bg-blue-900/50",
      text: "text-blue-800 dark:text-blue-300",
      badge: "bg-blue-500 dark:bg-blue-600"
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      icon: "bg-green-100 dark:bg-green-900/50",
      text: "text-green-800 dark:text-green-300",
      badge: "bg-green-500 dark:bg-green-600"
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`${colors.icon} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <h2 className={`text-2xl font-bold ${colors.text}`}>{title}</h2>
      </div>
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`${colors.badge} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>
              {index + 1}
            </span>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckingPage;
