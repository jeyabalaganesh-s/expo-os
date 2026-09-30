import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  BarChart3,
  Mail,
  IndianRupee,
  FileText,
} from "lucide-react";

/* ================= TYPES ================= */

type ReportData = {
  registrations: number;
  attendance: number;
  sessions: number;
  campaigns: number;
  revenue: number;
};

/* ================= MOCK DATA ================= */

const INITIAL_REPORT: ReportData = {
  registrations: 420,
  attendance: 312,
  sessions: 8,
  campaigns: 4,
  revenue: 345000,
};

/* ================= COMPONENT ================= */

export default function WorkspaceReports() {
  const [report, setReport] =
    useState<ReportData | null>(null);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_report");
    setReport(
      saved ? JSON.parse(saved) : INITIAL_REPORT
    );
  }, []);

  if (!report) return null;

  const attendanceRate = Math.round(
    (report.attendance / report.registrations) * 100
  );

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Event Reports
        </h1>
        <p className="text-sm text-gray-500">
          Consolidated post-event analytics
        </p>
      </div>

      {/* OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <ReportCard
          label="Registrations"
          value={report.registrations}
          icon={Users}
        />
        <ReportCard
          label="Attended"
          value={report.attendance}
          icon={CheckCircle}
        />
        <ReportCard
          label="Sessions"
          value={report.sessions}
          icon={BarChart3}
        />
        <ReportCard
          label="Campaigns"
          value={report.campaigns}
          icon={Mail}
        />
        <ReportCard
          label="Revenue"
          value={`₹${report.revenue.toLocaleString()}`}
          icon={IndianRupee}
        />
      </div>

      {/* HIGHLIGHTS */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <h3 className="font-medium text-gray-900">
          Key Highlights
        </h3>

        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>
            Attendance rate:{" "}
            <strong>{attendanceRate}%</strong>
          </li>
          <li>
            Highest engagement during live sessions
          </li>
          <li>
            Campaign open rates above industry average
          </li>
          <li>
            Event closed with positive net revenue
          </li>
        </ul>
      </div>

      {/* LINKED REPORTS */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <h3 className="font-medium text-gray-900">
          Detailed Reports
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ReportLink label="Attendance Report" />
          <ReportLink label="Session Engagement" />
          <ReportLink label="Campaign Performance" />
          <ReportLink label="Finance Report" />
          <ReportLink label="Feedback Summary" />
          <ReportLink label="Certificate Issuance" />
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-50 border border-dashed rounded-xl p-4 text-sm text-gray-600 flex items-center gap-2">
        <FileText size={16} />
        This report is auto-generated and locked as
        part of the post-event archive.
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ReportCard({
  label,
  value,
  icon: Icon,
}: any) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
      <div className="p-3 bg-orange-100 text-orange-700 rounded-lg">
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

function ReportLink({ label }: { label: string }) {
  return (
    <div className="border rounded-md px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
      {label}
    </div>
  );
}
