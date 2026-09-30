// src/pages/settings/AdminUsersPage.tsx
import { Plus, Edit, ShieldCheck, UserX } from "lucide-react";
import { Link } from "react-router-dom";


type AdminStatus = "Active" | "Inactive";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: AdminStatus;
  lastLogin: string;
};

const ADMINS: AdminUser[] = [
  {
    id: "ADM-001",
    name: "Super Admin",
    email: "admin@expoos.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "27 Jan 2025 • 10:15 AM",
  },
  {
    id: "ADM-002",
    name: "Finance Manager",
    email: "finance@expoos.com",
    role: "Finance Admin",
    status: "Active",
    lastLogin: "26 Jan 2025 • 04:40 PM",
  },
  {
    id: "ADM-003",
    name: "Event Manager",
    email: "events@expoos.com",
    role: "Event Admin",
    status: "Active",
    lastLogin: "25 Jan 2025 • 11:20 AM",
  },
  {
    id: "ADM-004",
    name: "Marketing Team",
    email: "marketing@expoos.com",
    role: "Communication Admin",
    status: "Inactive",
    lastLogin: "15 Jan 2025 • 09:10 AM",
  },
];

const statusStyle: Record<AdminStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-600",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Users
          </h1>
          <p className="text-sm text-gray-500">
            Manage admin accounts and role assignments
          </p>
        </div>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 flex items-center gap-2">
          <Plus size={16} />
           <Link to="/settings/admins/create">

          Add Admin</Link>
        </button>
      </div>

      {/* ================= INFO BANNER ================= */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 flex items-center gap-2">
        <ShieldCheck size={16} />
        Only Super Admins can add or deactivate admin users.
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search name / email"
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Roles</option>
          <option>Super Admin</option>
          <option>Finance Admin</option>
          <option>Event Admin</option>
          <option>Communication Admin</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* ================= ADMINS TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Admin</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Last Login</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {ADMINS.map((admin) => (
              <tr
                key={admin.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">{admin.name}</div>
                  <div className="text-xs text-gray-500">
                    {admin.email}
                  </div>
                </td>

                <td className="p-3">{admin.role}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[admin.status]}`}
                  >
                    {admin.status}
                  </span>
                </td>

                <td className="p-3">{admin.lastLogin}</td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      title="Edit Admin"
                      className="p-1 hover:text-blue-600"
                    >
                      <Edit size={16} />
                    </button>

                    {admin.role !== "Super Admin" && (
                      <button
                        title="Deactivate Admin"
                        className="p-1 hover:text-red-600"
                      >
                        <UserX size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Total admins: {ADMINS.length}
      </div>
    </div>
  );
}
