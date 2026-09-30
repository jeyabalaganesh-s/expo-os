import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  Activity,
} from "lucide-react";
import api from "../../../utils/api";

type DashboardStats = {
  totalRegistrations: number;
  checkedIn: number;
  pending: number;
  lastCheckInAt?: string;
};

export default function LiveDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DASHBOARD ================= */

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/event/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();

    // 🔁 Poll every 10 seconds
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="text-sm text-gray-400">
        Loading live dashboard…
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-sm text-red-500">
        Dashboard unavailable
      </div>
    );
  }

  const attendancePercent = Math.round(
    (stats.checkedIn / stats.totalRegistrations) * 100
  );

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Live Event Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Real-time attendance overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Registrations"
          value={stats.totalRegistrations}
          icon={Users}
          color="blue"
        />

        <StatCard
          label="Checked-In"
          value={stats.checkedIn}
          icon={CheckCircle}
          color="green"
        />

        <StatCard
          label="Pending"
          value={stats.pending}
          icon={Clock}
          color="orange"
        />

        <StatCard
          label="Attendance %"
          value={`${attendancePercent}%`}
          icon={Activity}
          color="purple"
        />
      </div>

      {/* FOOTER */}
      {stats.lastCheckInAt && (
        <div className="text-xs text-gray-400">
          Last check-in:{" "}
          {new Date(stats.lastCheckInAt).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

/* ================= CARD ================= */

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: any;
  color: "blue" | "green" | "orange" | "purple";
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
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
