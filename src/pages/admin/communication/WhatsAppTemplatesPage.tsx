// src/pages/communication/WhatsAppTemplatesPage.tsx
import { Eye, Edit, Trash2, Plus, Send } from "lucide-react";

type TemplateStatus =
  | "Draft"
  | "Submitted"
  | "Approved"
  | "Rejected"
  | "Disabled";

type TemplateCategory =
  | "Membership"
  | "Events"
  | "Webinars"
  | "Payments"
  | "System";

type WhatsAppTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  language: string;
  status: TemplateStatus;
  updatedOn: string;
};

const TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "WA-001",
    name: "Membership Welcome",
    category: "Membership",
    language: "English",
    status: "Approved",
    updatedOn: "05 Jan 2025",
  },
  {
    id: "WA-002",
    name: "Webinar Reminder – 1 Hour",
    category: "Webinars",
    language: "English",
    status: "Submitted",
    updatedOn: "18 Dec 2025",
  },
  {
    id: "WA-003",
    name: "Event Registration Confirmation",
    category: "Events",
    language: "English",
    status: "Approved",
    updatedOn: "08 Jan 2025",
  },
  {
    id: "WA-004",
    name: "Payment Receipt",
    category: "Payments",
    language: "English",
    status: "Rejected",
    updatedOn: "02 Jan 2025",
  },
];

const statusStyle: Record<TemplateStatus, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Submitted: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Disabled: "bg-gray-200 text-gray-600",
};

export default function WhatsAppTemplatesPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            WhatsApp Templates
          </h1>
          <p className="text-sm text-gray-500">
            Manage WhatsApp message templates for automated communication
          </p>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 flex items-center gap-2">
          <Plus size={16} />
          Create Template
        </button>
      </div>

      {/* ================= INFO BANNER ================= */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
        ⚠️ WhatsApp templates must be approved before sending messages.
        Only <b>Approved</b> templates can be used in broadcasts or automation.
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search template name"
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Categories</option>
          <option>Membership</option>
          <option>Events</option>
          <option>Webinars</option>
          <option>Payments</option>
          <option>System</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Draft</option>
          <option>Submitted</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Disabled</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Languages</option>
          <option>English</option>
          <option>Tamil</option>
          <option>Hindi</option>
        </select>
      </div>

      {/* ================= TEMPLATES TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Template</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Language</th>
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

                <td className="p-3">{tpl.language}</td>

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
                      className="p-1 hover:text-green-600"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      title="Edit"
                      className="p-1 hover:text-blue-600"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      title="Submit / Resubmit"
                      className="p-1 hover:text-orange-600"
                    >
                      <Send size={16} />
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
        Total WhatsApp templates: {TEMPLATES.length}
      </div>
    </div>
  );
}
