// src/pages/DashboardPage.tsx
import {
  Users,
  CalendarDays,
  Wallet,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Members",
    value: "2,431",
    change: "+12%",
    icon: Users,
  },
  {
    label: "Active Events",
    value: "8",
    change: "+2",
    icon: CalendarDays,
  },
  {
    label: "Monthly Revenue",
    value: "₹4,85,000",
    change: "+18%",
    icon: Wallet,
  },
  {
    label: "Pending Issues",
    value: "3",
    change: "-1",
    icon: AlertTriangle,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Expo OS system overview & performance
          </p>
        </div>

        <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700">
          Create Event
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </h2>
                </div>

                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-green-600">
                {stat.change} from last period
              </p>
            </div>
          );
        })}
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* -------- Recent Activities -------- */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>

          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Action</th>
                <th className="text-left py-2">User</th>
                <th className="text-left py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  action: "New member registered",
                  user: "System",
                  time: "2 mins ago",
                },
                {
                  action: "Payment received ₹3,000",
                  user: "Finance Admin",
                  time: "20 mins ago",
                },
                {
                  action: "Event created – Coimbatore Expo",
                  user: "Ops Admin",
                  time: "1 hour ago",
                },
              ].map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3">{row.action}</td>
                  <td className="py-3 text-gray-600">{row.user}</td>
                  <td className="py-3 text-gray-500">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------- Quick Actions -------- */}
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>

          <div className="space-y-3">
            {[
              "Create Event",
              "Add Member",
              "Create Offer",
              "Send Campaign",
              "View Payments",
            ].map((action) => (
              <button
                key={action}
                className="w-full text-left px-4 py-3 border rounded-md text-sm hover:bg-orange-50 hover:border-orange-300"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
