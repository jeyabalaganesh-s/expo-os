// src/pages/LiveMetricsPage.tsx
import { useEffect, useState } from "react";
import {
  Users,
  Wallet,
  Activity,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

type Metric = {
  label: string;
  value: number;
  unit?: string;
  icon: any;
  color: string;
};

export default function LiveMetricsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: "Online Members",
      value: 124,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Sessions",
      value: 86,
      icon: Activity,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Payments (Today)",
      value: 12,
      unit: "txns",
      icon: Wallet,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Live Events",
      value: 2,
      icon: CalendarDays,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "System Alerts",
      value: 1,
      icon: AlertCircle,
      color: "bg-red-100 text-red-600",
    },
  ]);

  // 🔁 Simulated live updates (replace with WebSocket / API polling)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value:
            m.value +
            Math.floor(Math.random() * 3 - 1), // ± random change
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Live Metrics
        </h1>
        <p className="text-sm text-gray-500">
          Real-time system activity across Expo OS
        </p>
      </div>

      {/* ================= METRIC CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {metric.label}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900 mt-1">
                    {metric.value}
                    {metric.unit && (
                      <span className="text-sm font-medium ml-1">
                        {metric.unit}
                      </span>
                    )}
                  </h2>
                </div>

                <div
                  className={`h-11 w-11 flex items-center justify-center rounded-lg ${metric.color}`}
                >
                  <Icon size={22} />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-500">
                  Updating live
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= ACTIVITY STREAM ================= */}
      <div className="bg-white border rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-4">
          Live Activity Stream
        </h3>

        <ul className="space-y-3 text-sm">
          {[
            "Member logged in from Coimbatore",
            "Payment ₹3,000 received",
            "New member registered",
            "Event check-in detected",
            "Admin updated pricing rule",
          ].map((log, i) => (
            <li
              key={i}
              className="flex items-center gap-3 border-b pb-2 last:border-0"
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-gray-700">{log}</span>
              <span className="ml-auto text-xs text-gray-400">
                just now
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
