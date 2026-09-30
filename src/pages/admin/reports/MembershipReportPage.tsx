// src/pages/reports/MembershipReportPage.tsx
import { Users, UserCheck, UserX, Wallet } from "lucide-react";

export default function MembershipReportPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Membership Report
        </h1>
        <p className="text-sm text-gray-500">
          Membership growth, revenue, and status insights
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Members"
          value="3,245"
          icon={<Users size={20} />}
        />
        <SummaryCard
          title="Active Members"
          value="2,610"
          icon={<UserCheck size={20} />}
        />
        <SummaryCard
          title="Expired / Blocked"
          value="635"
          icon={<UserX size={20} />}
        />
        <SummaryCard
          title="Membership Revenue"
          value="₹97,35,000"
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
          <option>All Plans</option>
          <option>Annual Membership</option>
          <option>Student Membership</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Blocked</option>
        </select>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700">
          Apply Filters
        </button>
      </div>

      {/* ================= REPORT TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Member</th>
              <th className="text-left p-3">Plan</th>
              <th className="text-left p-3">Joined On</th>
              <th className="text-left p-3">Expiry</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {REPORT_DATA.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">{row.name}</div>
                  <div className="text-xs text-gray-500">
                    {row.email}
                  </div>
                </td>

                <td className="p-3">{row.plan}</td>
                <td className="p-3">{row.joinedOn}</td>
                <td className="p-3">{row.expiry}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : row.status === "Expired"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="p-3 font-semibold">
                  ₹{row.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Showing {REPORT_DATA.length} membership records
      </div>
    </div>
  );
}

/* ================= MOCK DATA ================= */

const REPORT_DATA = [
  {
    id: "MR-001",
    name: "Arun Kumar",
    email: "arun@gmail.com",
    plan: "Annual Membership",
    joinedOn: "05 Jan 2025",
    expiry: "04 Jan 2026",
    status: "Active",
    amount: 3000,
  },
  {
    id: "MR-002",
    name: "Meena Iyer",
    email: "meena@gmail.com",
    plan: "Annual Membership",
    joinedOn: "12 Feb 2024",
    expiry: "11 Feb 2025",
    status: "Expired",
    amount: 3000,
  },
  {
    id: "MR-003",
    name: "Karthik Raj",
    email: "karthik@gmail.com",
    plan: "Student Membership",
    joinedOn: "10 Mar 2025",
    expiry: "09 Mar 2026",
    status: "Blocked",
    amount: 1500,
  },
];

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
