import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

const MODULES = [
  {
    name: "Members",
    permissions: ["View", "Create", "Edit", "Block"],
  },
  {
    name: "Memberships",
    permissions: ["View", "Create", "Edit", "Pricing"],
  },
  {
    name: "Events",
    permissions: ["View", "Create", "Edit", "Publish"],
  },
  {
    name: "Webinars",
    permissions: ["View", "Create", "Edit"],
  },
  {
    name: "Finance",
    permissions: ["View Payments", "Invoices", "Refunds"],
  },
  {
    name: "Communication",
    permissions: ["Email", "WhatsApp", "SMS"],
  },
  {
    name: "Reports",
    permissions: ["View", "Export"],
  },
  {
    name: "Settings",
    permissions: ["Manage Roles", "System Config"],
  },
];

export default function CreateRolePage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            to="/settings/roles"
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Role
            </h1>
            <p className="text-sm text-gray-500">
              Define access permissions for admin users
            </p>
          </div>
        </div>

        <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 flex items-center gap-2">
          <Save size={14} />
          Save Role
        </button>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        {/* ===== BASIC INFO ===== */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Role Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Role Name" placeholder="Membership Admin" />
            <Select label="Role Status">
              <option>Active</option>
              <option>Inactive</option>
            </Select>
          </div>

          <textarea
            rows={3}
            placeholder="Role description (optional)"
            className="border rounded-md px-3 py-2 text-sm w-full"
          />
        </section>

        {/* ===== PERMISSIONS ===== */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Permissions
          </h2>

          <div className="space-y-4">
            {MODULES.map((module) => (
              <div
                key={module.name}
                className="border rounded-lg p-4"
              >
                <div className="font-medium text-gray-900 mb-2">
                  {module.name}
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  {module.permissions.map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center gap-2"
                    >
                      <input type="checkbox" />
                      {perm}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ================= FOOTER ACTIONS ================= */}
      <div className="flex justify-end gap-3">
        <Link
          to="/settings/roles"
          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button className="px-5 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700">
          Create Role
        </button>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select className="w-full border rounded-md px-3 py-2 text-sm">
        {children}
      </select>
    </div>
  );
}
