// src/pages/settings/RolesPermissionsPage.tsx
import { Edit, Shield } from "lucide-react";
import { Link } from "react-router-dom";

type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "approve"
  | "export";

type ModulePermission = {
  module: string;
  actions: PermissionAction[];
};

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: ModulePermission[];
};

const ROLES: Role[] = [
  {
    id: "ROLE-001",
    name: "Super Admin",
    description: "Full system access",
    permissions: [
      { module: "All Modules", actions: ["view","create","edit","delete","approve","export"] },
    ],
  },
  {
    id: "ROLE-002",
    name: "Finance Admin",
    description: "Manage payments, invoices & refunds",
    permissions: [
      { module: "Payments", actions: ["view","approve","export"] },
      { module: "Invoices", actions: ["view","create","export"] },
      { module: "Refunds", actions: ["view","approve"] },
    ],
  },
  {
    id: "ROLE-003",
    name: "Event Admin",
    description: "Manage events & stalls",
    permissions: [
      { module: "Events", actions: ["view","create","edit"] },
      { module: "Stalls", actions: ["view","edit"] },
    ],
  },
  {
    id: "ROLE-004",
    name: "Communication Admin",
    description: "Manage email, WhatsApp & SMS templates",
    permissions: [
      { module: "Communication", actions: ["view","create","edit"] },
    ],
  },
];

export default function RolesPermissionsPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Roles & Permissions
          </h1>
          <p className="text-sm text-gray-500">
            Control access across Expo OS modules
          </p>
        </div>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 flex items-center gap-2">
 <Link to="/settings/roles/create">+ Create Role</Link>

        </button>
      </div>

      {/* ================= INFO ================= */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800 flex items-center gap-2">
        <Shield size={16} />
        Super Admin role cannot be edited or deleted.
      </div>

      {/* ================= ROLES TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Description</th>
              <th className="text-left p-3">Permissions</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {ROLES.map((role) => (
              <tr
                key={role.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">{role.name}</div>
                  <div className="text-xs text-gray-500">{role.id}</div>
                </td>

                <td className="p-3">{role.description}</td>

                <td className="p-3 text-xs">
                  {role.permissions.map((perm, idx) => (
                    <div key={idx}>
                      <span className="font-medium">{perm.module}</span>:{" "}
                      {perm.actions.join(", ")}
                    </div>
                  ))}
                </td>

                <td className="p-3 text-right">
                  {role.name !== "Super Admin" && (
                    <button
                      title="Edit Role"
                      className="p-1 hover:text-blue-600"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Total roles: {ROLES.length}
      </div>
    </div>
  );
}
