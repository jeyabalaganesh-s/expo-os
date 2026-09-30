import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import api from "../../../utils/api";
import {
  Plus,
  Trash2,
  Shield,
} from "lucide-react";

/* ================= TYPES ================= */

type PermissionKey =
  | "LANDING"
  | "REGISTRATION"
  | "PRICING"
  | "PAYMENTS"
  | "CAMPAIGNS"
  | "AGENDA"
  | "MEDIA"
  | "CHECKIN"
  | "ANALYTICS"
  | "ROLES";

type Role = {
  id: string;
  name: string;
  description?: string;
  permissions: PermissionKey[];
  system?: boolean; // default roles
};

/* ================= CONSTANTS ================= */

const ALL_PERMISSIONS: {
  key: PermissionKey;
  label: string;
}[] = [
  { key: "LANDING", label: "Landing Page" },
  { key: "REGISTRATION", label: "Registration" },
  { key: "PRICING", label: "Pricing" },
  { key: "PAYMENTS", label: "Payments" },
  { key: "CAMPAIGNS", label: "Email Campaigns" },
  { key: "AGENDA", label: "Agenda" },
  { key: "MEDIA", label: "Media & Assets" },
  { key: "CHECKIN", label: "Check-in / Live Ops" },
  { key: "ANALYTICS", label: "Analytics" },
  { key: "ROLES", label: "Roles & Access" },
];

/* ================= COMPONENT ================= */

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  // later comes from event context
  const eventPhase: "PRE" | "ONGOING" | "POST" = "PRE";

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await api.get("/events/current/roles");
      setRoles(res.data);
    } catch {
      // fallback defaults
      setRoles([
        {
          id: "owner",
          name: "Event Owner",
          description: "Full access to this event",
          permissions: ALL_PERMISSIONS.map((p) => p.key),
          system: true,
        },
        {
          id: "staff",
          name: "Event Staff",
          description: "Manage check-in and operations",
          permissions: ["CHECKIN", "AGENDA"],
          system: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */

  const addRole = () => {
    setRoles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        description: "",
        permissions: [],
      },
    ]);
  };

  const updateRole = (
    id: string,
    key: keyof Role,
    value: any
  ) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [key]: value } : r
      )
    );
  };

  const togglePermission = (
    roleId: string,
    permission: PermissionKey
  ) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id !== roleId
          ? r
          : {
              ...r,
              permissions: r.permissions.includes(permission)
                ? r.permissions.filter(
                    (p) => p !== permission
                  )
                : [...r.permissions, permission],
            }
      )
    );
  };

  const removeRole = (id: string) => {
    if (!confirm("Delete this role?")) return;
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };


  /* ================= UI ================= */

  return (
    <PageShell
      title="Roles & Permissions"
      description="Manage who can access and control different parts of this event"
    >
      {loading ? (
        <div className="text-sm text-gray-500">
          Loading roles...
        </div>
      ) : (
        <div className="space-y-6 max-w-6xl">
          {/* ================= ROLES ================= */}
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white border rounded-xl p-4 space-y-4"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  <input
                    disabled={role.system}
                    placeholder="Role name"
                    value={role.name}
                    onChange={(e) =>
                      updateRole(
                        role.id,
                        "name",
                        e.target.value
                      )
                    }
                    className="border rounded px-3 py-1 text-sm"
                  />
                </div>

                {!role.system && (
                  <button
                    onClick={() => removeRole(role.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* DESCRIPTION */}
              <input
                disabled={role.system}
                placeholder="Role description"
                value={role.description}
                onChange={(e) =>
                  updateRole(
                    role.id,
                    "description",
                    e.target.value
                  )
                }
                className="w-full border rounded px-3 py-2 text-sm"
              />

              {/* PERMISSIONS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ALL_PERMISSIONS.map((perm) => (
                  <label
                    key={perm.key}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(
                        perm.key
                      )}
                      onChange={() =>
                        togglePermission(
                          role.id,
                          perm.key
                        )
                      }
                    />
                    {perm.label}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* ================= ACTIONS ================= */}
          {eventPhase === "PRE" && (
            <button
              onClick={addRole}
              className="text-sm text-orange-600 flex items-center gap-1"
            >
              <Plus size={14} />
              Add Role
            </button>
          )}

        </div>
      )}
    </PageShell>
  );
}
