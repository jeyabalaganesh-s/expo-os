// src/pages/communication/SMSTemplatesPage.tsx
import { Eye, Edit, Trash2, Plus } from "lucide-react";

type TemplateStatus = "Draft" | "Approved" | "Disabled";
type TemplateCategory =
  | "OTP"
  | "Membership"
  | "Events"
  | "Webinars"
  | "Payments"
  | "System";

type SMSTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  senderId: string;
  status: TemplateStatus;
  charCount: number;
  updatedOn: string;
};

const TEMPLATES: SMSTemplate[] = [
  {
    id: "SMS-001",
    name: "Login OTP",
    category: "OTP",
    senderId: "EXPOOS",
    status: "Approved",
    charCount: 92,
    updatedOn: "05 Jan 2025",
  },
  {
    id: "SMS-002",
    name: "Event Reminder",
    category: "Events",
    senderId: "EXPOOS",
    status: "Approved",
    charCount: 138,
    updatedOn: "10 Jan 2025",
  },
  {
    id: "SMS-003",
    name: "Webinar Join Link",
    category: "Webinars",
    senderId: "EXPOOS",
    status: "Draft",
    charCount: 160,
    updatedOn: "18 Dec 2025",
  },
  {
    id: "SMS-004",
    name: "Payment Failed Alert",
    category: "Payments",
    senderId: "EXPOOS",
    status: "Disabled",
    charCount: 120,
    updatedOn: "02 Jan 2025",
  },
];

const statusStyle: Record<TemplateStatus, string> = {
  Draft: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Disabled: "bg-gray-100 text-gray-600",
};

export default function SMSTemplatesPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            SMS Templates
          </h1>
          <p className="text-sm text-gray-500">
            Manage SMS templates for alerts, OTPs, and reminders
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} />
          Create Template
        </button>
      </div>

      {/* ================= INFO BANNER ================= */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        ℹ️ SMS templates must comply with DLT regulations.
        Character count determines SMS parts and cost.
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search template name"
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Categories</option>
          <option>OTP</option>
          <option>Membership</option>
          <option>Events</option>
          <option>Webinars</option>
          <option>Payments</option>
          <option>System</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Draft</option>
          <option>Approved</option>
          <option>Disabled</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Sender IDs</option>
          <option>EXPOOS</option>
          <option>SUKAOS</option>
        </select>
      </div>

      {/* ================= TEMPLATES TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Template</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Sender ID</th>
              <th className="text-left p-3">Characters</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Last Updated</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {TEMPLATES.map((tpl) => (
              <tr
                key={tpl.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">{tpl.name}</div>
                  <div className="text-xs text-gray-500">{tpl.id}</div>
                </td>

                <td className="p-3">{tpl.category}</td>

                <td className="p-3 font-mono">{tpl.senderId}</td>

                <td className="p-3">
                  {tpl.charCount}
                  <span className="text-xs text-gray-500">
                    {" "}
                    chars
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[tpl.status]}`}
                  >
                    {tpl.status}
                  </span>
                </td>

                <td className="p-3">{tpl.updatedOn}</td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      title="Preview"
                      className="p-1 hover:text-blue-600"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      title="Edit"
                      className="p-1 hover:text-indigo-600"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      title="Delete"
                      className="p-1 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Total SMS templates: {TEMPLATES.length}
      </div>
    </div>
  );
}
