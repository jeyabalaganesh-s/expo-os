// src/pages/audit/AdminAuditLogsPage.tsx
import { Eye, ShieldCheck } from "lucide-react";

type ActionType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "APPROVE"
  | "REJECT";

type ModuleType =
  | "Members"
  | "Events"
  | "Stalls"
  | "Payments"
  | "Refunds"
  | "Membership"
  | "Communication"
  | "System";

type AuditLog = {
  id: string;
  adminName: string;
  adminRole: string;
  action: ActionType;
  module: ModuleType;
  reference: string;
  ip: string;
  timestamp: string;
};

const LOGS: AuditLog[] = [
  {
    id: "AUD-001",
    adminName: "Super Admin",
    adminRole: "Super Admin",
    action: "LOGIN",
    module: "System",
    reference: "Admin Login",
    ip: "103.21.45.12",
    timestamp: "27 Jan 2025 • 10:15 AM",
  },
  {
    id: "AUD-002",
    adminName: "Finance Admin",
    adminRole: "Finance",
    action: "APPROVE",
    module: "Refunds",
    reference: "REF-2025-002",
    ip: "103.21.45.18",
    timestamp: "27 Jan 2025 • 11:40 AM",
  },
  {
    id: "AUD-003",
    adminName: "Event Admin",
    adminRole: "Events",
    action: "UPDATE",
    module: "Events",
    reference: "EVT-001",
    ip: "103.21.45.22",
    timestamp: "27 Jan 2025 • 01:05 PM",
  },
  {
    id: "AUD-004",
    adminName: "Marketing Admin",
    adminRole: "Communication",
    action: "CREATE",
    module: "Communication",
    reference: "WhatsApp Template – Webinar Reminder",
    ip: "103.21.45.30",
    timestamp: "27 Jan 2025 • 02:10 PM",
  },
];

const actionStyle: Record<ActionType, string> = {
  CREATE: "bg-green-100 text-green-700",
  UPDATE: "bg-blue-100 text-blue-700",
  DELETE: "bg-red-100 text-red-700",
  LOGIN: "bg-gray-100 text-gray-700",
  LOGOUT: "bg-gray-100 text-gray-700",
  APPROVE: "bg-purple-100 text-purple-700",
  REJECT: "bg-orange-100 text-orange-700",
};

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Audit & Admin Logs
          </h1>
          <p className="text-sm text-gray-500">
            Complete activity trail of admin actions
          </p>
        </div>

        <ShieldCheck className="text-orange-600" />
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search admin / reference"
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Actions</option>
          <option>CREATE</option>
          <option>UPDATE</option>
          <option>DELETE</option>
          <option>LOGIN</option>
          <option>LOGOUT</option>
          <option>APPROVE</option>
          <option>REJECT</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Modules</option>
          <option>Members</option>
          <option>Events</option>
          <option>Stalls</option>
          <option>Payments</option>
          <option>Refunds</option>
          <option>Membership</option>
          <option>Communication</option>
          <option>System</option>
        </select>

        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* ================= LOGS TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Admin</th>
              <th className="text-left p-3">Action</th>
              <th className="text-left p-3">Module</th>
              <th className="text-left p-3">Reference</th>
              <th className="text-left p-3">IP Address</th>
              <th className="text-left p-3">Timestamp</th>
              <th className="text-right p-3">Details</th>
            </tr>
          </thead>

          <tbody>
            {LOGS.map((log) => (
              <tr
                key={log.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">{log.adminName}</div>
                  <div className="text-xs text-gray-500">
                    {log.adminRole}
                  </div>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${actionStyle[log.action]}`}
                  >
                    {log.action}
                  </span>
                </td>

                <td className="p-3">{log.module}</td>

                <td className="p-3">{log.reference}</td>

                <td className="p-3 font-mono text-xs">
                  {log.ip}
                </td>

                <td className="p-3">{log.timestamp}</td>

                <td className="p-3 text-right">
                  <button
                    title="View Details"
                    className="p-1 hover:text-orange-600"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Showing {LOGS.length} audit log entries
      </div>
    </div>
  );
}
