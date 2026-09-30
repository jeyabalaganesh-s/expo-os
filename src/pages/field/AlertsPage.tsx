import { useNavigate } from "react-router-dom";

const alerts = [
  {
    id: "a1",
    title: "Fire Drill – Hall B",
    message: "Immediate evacuation drill in Hall B. Follow protocol.",
    level: "Critical",
    time: "2 mins ago",
  },
  {
    id: "a2",
    title: "VIP Arrival",
    message: "VIP arriving at Gate 1. Security to be present.",
    level: "High",
    time: "10 mins ago",
  },
  {
    id: "a3",
    title: "Cleaning Required",
    message: "Spillage near Food Court Zone C.",
    level: "Normal",
    time: "25 mins ago",
  },
];

export default function AlertsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Alerts</h2>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          onClick={() => navigate(`/field/alerts/${alert.id}`)}
          className={`p-4 rounded-xl border cursor-pointer shadow-sm
          ${
            alert.level === "Critical"
              ? "bg-red-50 border-red-300"
              : alert.level === "High"
              ? "bg-orange-50 border-orange-300"
              : "bg-blue-50 border-blue-300"
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{alert.title}</h3>
            <span className="text-xs text-gray-600">{alert.time}</span>
          </div>

          <p className="text-sm text-gray-700 mt-2 line-clamp-2">
            {alert.message}
          </p>

          <span
            className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full
            ${
              alert.level === "Critical"
                ? "bg-red-600 text-white"
                : alert.level === "High"
                ? "bg-orange-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {alert.level}
          </span>
        </div>
      ))}
    </div>
  );
}
