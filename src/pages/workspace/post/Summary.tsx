import {
  Users,
  CheckCircle,
  IndianRupee,
  TrendingUp,
  BarChart3,
  Mail,
  Star,
} from "lucide-react";

/* ================= COMPONENT ================= */

export default function WorkspaceEventSummary() {
  // FRONTEND-ONLY MOCK SUMMARY DATA
  const summary = {
    eventName: "Foodpreneurs Growth Summit 2026",
    date: "31 Jan 2026",
    registrations: 420,
    attended: 312,
    revenue: 345000,
    expenses: 225000,
    sessions: 8,
    campaigns: 4,
    avgRating: 4.6,
    topSession: "How to Build a Food Brand",
    topCampaign: "Webinar Reminder – Day Before",
  };

  const attendanceRate = Math.round(
    (summary.attended / summary.registrations) * 100
  );

  const netProfit = summary.revenue - summary.expenses;

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Event Summary
        </h1>
        <p className="text-sm text-gray-500">
          Overall performance snapshot of the event
        </p>
      </div>

      {/* EVENT INFO */}
      <div className="bg-white border rounded-xl p-4">
        <div className="text-lg font-medium">
          {summary.eventName}
        </div>
        <div className="text-sm text-gray-500">
          Event Date: {summary.date}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <KpiCard
          label="Registrations"
          value={summary.registrations}
          icon={Users}
        />
        <KpiCard
          label="Attended"
          value={summary.attended}
          icon={CheckCircle}
        />
        <KpiCard
          label="Attendance %"
          value={`${attendanceRate}%`}
          icon={BarChart3}
        />
        <KpiCard
          label="Revenue"
          value={`₹${summary.revenue.toLocaleString()}`}
          icon={IndianRupee}
        />
        <KpiCard
          label="Net Result"
          value={`₹${netProfit.toLocaleString()}`}
          icon={TrendingUp}
          positive={netProfit >= 0}
        />
      </div>

      {/* HIGHLIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ENGAGEMENT */}
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-gray-900">
            Engagement Highlights
          </h3>

          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>
              Average feedback rating:{" "}
              <strong>{summary.avgRating} / 5</strong>
            </li>
            <li>
              High poll & Q&A participation
            </li>
            <li>
              Strong networking engagement
            </li>
            <li>
              Positive speaker feedback
            </li>
          </ul>
        </div>

        {/* PERFORMANCE */}
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-gray-900">
            Performance Highlights
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Star size={14} className="text-orange-600" />
              Top Session:{" "}
              <strong>{summary.topSession}</strong>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={14} className="text-orange-600" />
              Best Campaign:{" "}
              <strong>{summary.topCampaign}</strong>
            </div>

            <div className="flex items-center gap-2">
              <Users size={14} className="text-orange-600" />
              Total Sessions Conducted:{" "}
              <strong>{summary.sessions}</strong>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={14} className="text-orange-600" />
              Campaigns Run:{" "}
              <strong>{summary.campaigns}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL STATUS */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
        ✅ This event was completed successfully with
        strong attendance, positive feedback, and a
        profitable outcome.
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function KpiCard({
  label,
  value,
  icon: Icon,
  positive = true,
}: any) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
      <div
        className={`p-3 rounded-lg ${
          positive
            ? "bg-orange-100 text-orange-700"
            : "bg-red-100 text-red-700"
        }`}
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
