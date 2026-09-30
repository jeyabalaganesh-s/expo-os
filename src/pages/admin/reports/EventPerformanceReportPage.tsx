// src/pages/reports/EventPerformanceReportPage.tsx
import {
  CalendarDays,
  Users,
  Wallet,
  BarChart3,
} from "lucide-react";

type EventType = "Expo" | "Webinar" | "Meetup";

type EventPerformance = {
  id: string;
  name: string;
  type: EventType;
  date: string;
  registrations: number;
  attendance: number;
  stallsTotal?: number;
  stallsBooked?: number;
  revenue: number;
};

const EVENTS: EventPerformance[] = [
  {
    id: "EVT-001",
    name: "SUKA Food Expo – Coimbatore",
    type: "Expo",
    date: "20–22 Mar 2025",
    registrations: 180,
    attendance: 162,
    stallsTotal: 120,
    stallsBooked: 98,
    revenue: 2460000,
  },
  {
    id: "EVT-002",
    name: "Foodpreneurs Webinar",
    type: "Webinar",
    date: "21 Dec 2025",
    registrations: 412,
    attendance: 356,
    revenue: 0,
  },
  {
    id: "EVT-003",
    name: "SUKA Meetup – Chennai",
    type: "Meetup",
    date: "15 Feb 2025",
    registrations: 95,
    attendance: 82,
    revenue: 285000,
  },
];

export default function EventPerformanceReportPage() {
  const totalRevenue = EVENTS.reduce(
    (sum, e) => sum + e.revenue,
    0
  );

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Event Performance
        </h1>
        <p className="text-sm text-gray-500">
          Analyze event success, engagement, and revenue
        </p>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Events"
          value={EVENTS.length.toString()}
          icon={<CalendarDays size={20} />}
        />
        <SummaryCard
          title="Total Registrations"
          value="687"
          icon={<Users size={20} />}
        />
        <SummaryCard
          title="Average Attendance %"
          value="87%"
          icon={<BarChart3 size={20} />}
        />
        <SummaryCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={<Wallet size={20} />}
        />
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
        />
        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Event Types</option>
          <option>Expo</option>
          <option>Webinar</option>
          <option>Meetup</option>
        </select>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700">
          Apply Filters
        </button>
      </div>

      {/* ================= PERFORMANCE TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Event</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Registrations</th>
              <th className="text-left p-3">Attendance</th>
              <th className="text-left p-3">Stalls</th>
              <th className="text-right p-3">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {EVENTS.map((event) => {
              const attendanceRate = Math.round(
                (event.attendance / event.registrations) * 100
              );

              return (
                <tr
                  key={event.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="font-medium">{event.name}</div>
                    <div className="text-xs text-gray-500">
                      {event.date}
                    </div>
                  </td>

                  <td className="p-3">{event.type}</td>

                  <td className="p-3">{event.registrations}</td>

                  <td className="p-3">
                    {event.attendance}{" "}
                    <span className="text-xs text-gray-500">
                      ({attendanceRate}%)
                    </span>
                  </td>

                  <td className="p-3">
                    {event.type === "Expo" ? (
                      <span>
                        {event.stallsBooked}/{event.stallsTotal}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        —
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-right font-semibold">
                    ₹{event.revenue.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Showing {EVENTS.length} events
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          {value}
        </h2>
      </div>
      <div className="text-orange-600">{icon}</div>
    </div>
  );
}
