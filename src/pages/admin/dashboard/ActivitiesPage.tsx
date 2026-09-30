// src/pages/ActivitiesPage.tsx
import {
  UserPlus,
  Wallet,
  CalendarDays,
  Settings,
  ShieldCheck,
} from "lucide-react";

type Activity = {
  id: string;
  type: "member" | "payment" | "event" | "system" | "security";
  message: string;
  user: string;
  time: string;
};

const ICON_MAP = {
  member: UserPlus,
  payment: Wallet,
  event: CalendarDays,
  system: Settings,
  security: ShieldCheck,
};

const COLOR_MAP = {
  member: "bg-blue-100 text-blue-600",
  payment: "bg-green-100 text-green-600",
  event: "bg-purple-100 text-purple-600",
  system: "bg-gray-100 text-gray-600",
  security: "bg-red-100 text-red-600",
};

const ACTIVITIES: Activity[] = [
  {
    id: "A1",
    type: "member",
    message: "New member registered",
    user: "System",
    time: "2 mins ago",
  },
  {
    id: "A2",
    type: "payment",
    message: "Payment ₹3,000 received",
    user: "Finance Admin",
    time: "15 mins ago",
  },
  {
    id: "A3",
    type: "event",
    message: "Event created – Coimbatore Expo",
    user: "Ops Admin",
    time: "1 hour ago",
  },
  {
    id: "A4",
    type: "system",
    message: "Membership pricing updated",
    user: "Super Admin",
    time: "3 hours ago",
  },
  {
    id: "A5",
    type: "security",
    message: "Admin login from new device",
    user: "Security System",
    time: "Yesterday",
  },
];

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Activities
        </h1>
        <p className="text-sm text-gray-500">
          Complete system activity & admin actions timeline
        </p>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Types</option>
          <option>Members</option>
          <option>Payments</option>
          <option>Events</option>
          <option>System</option>
          <option>Security</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Users</option>
          <option>Super Admin</option>
          <option>Ops Admin</option>
          <option>Finance Admin</option>
        </select>

        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* ================= ACTIVITY LIST ================= */}
      <div className="bg-white border rounded-xl divide-y">
        {ACTIVITIES.map((activity) => {
          const Icon = ICON_MAP[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 hover:bg-gray-50"
            >
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-lg ${COLOR_MAP[activity.type]}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {activity.user}
                </p>
              </div>

              <div className="text-xs text-gray-400 whitespace-nowrap">
                {activity.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
