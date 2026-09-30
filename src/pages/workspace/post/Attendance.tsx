import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Percent,
} from "lucide-react";

/* ================= TYPES ================= */

type Attendee = {
  id: string;
  name: string;
  email: string;
  checkedIn: boolean;
};

/* ================= MOCK DATA ================= */

const INITIAL_ATTENDEES: Attendee[] = [
  {
    id: "a1",
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    checkedIn: true,
  },
  {
    id: "a2",
    name: "Suresh Kumar",
    email: "suresh@gmail.com",
    checkedIn: false,
  },
  {
    id: "a3",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    checkedIn: true,
  },
];

/* ================= COMPONENT ================= */

export default function WorkspaceAttendance() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_attendance");
    setAttendees(
      saved ? JSON.parse(saved) : INITIAL_ATTENDEES
    );
  }, []);

  /* ================= STATS ================= */

  const total = attendees.length;
  const present = attendees.filter(
    (a) => a.checkedIn
  ).length;
  const absent = total - present;
  const percent =
    total === 0
      ? 0
      : Math.round((present / total) * 100);

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Attendance
        </h1>
        <p className="text-sm text-gray-500">
          Final attendance report (read-only)
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Registered"
          value={total}
          icon={Users}
          color="blue"
        />
        <StatCard
          label="Present"
          value={present}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          label="Absent"
          value={absent}
          icon={XCircle}
          color="red"
        />
        <StatCard
          label="Attendance %"
          value={`${percent}%`}
          icon={Percent}
          color="orange"
        />
      </div>

      {/* ATTENDEE LIST */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendees.map((a) => (
              <tr
                key={a.id}
                className="border-b last:border-0"
              >
                <td className="p-3 font-medium">
                  {a.name}
                </td>
                <td className="p-3">{a.email}</td>
                <td className="p-3">
                  {a.checkedIn ? (
                    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                      <CheckCircle size={14} />
                      Present
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium">
                      <XCircle size={14} />
                      Absent
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: any) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
      <div
        className={`p-3 rounded-lg ${colorMap[color]}`}
      >
        <Icon size={20} />
      </div>

      <div>
        <div className="text-xs text-gray-500">
          {label}
        </div>
        <div className="text-xl font-semibold text-gray-900">
          {value}
        </div>
      </div>
    </div>
  );
}
