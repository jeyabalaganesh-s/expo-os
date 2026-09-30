import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import {
  UserPlus,
  Shield,
  Trash2,
  CheckCircle,
  Clock,
} from "lucide-react";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type TeamRole =
  | "Owner"
  | "Event Manager"
  | "Content"
  | "Marketing"
  | "Finance"
  | "Volunteer";

type MemberStatus = "Active" | "Invited";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
};

/* ================= COMPONENT ================= */

export default function Teams() {
  // Later this comes from Event Context
  const eventPhase: "PRE" | "ONGOING" | "POST" = "PRE";

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] =
    useState<TeamRole>("Volunteer");


    const url = window.location.href;
const base = url.split("/workspace")[0];
const slug = base.split("//")[1].split(".")[0];
  /* ================= LOAD ================= */
useEffect(() => {
  fetchMembers();
}, []);

const fetchMembers = async () => {
  const res = await api.get(`/events/${slug}/team`);
  setMembers(res.data);
};

const inviteMember = async () => {
  if (!inviteEmail) return;

  await api.post(`/events/${slug}/invite`, {
    email: inviteEmail,
    role: inviteRole,
  });

  setInviteEmail("");
  setInviteRole("Volunteer");

  alert("Invitation sent successfully");
};


const updateRole = async (id: string, role: TeamRole) => {
  await api.put(`/events/${slug}/team/${id}/role`, {
    role,
  });

  setMembers((prev) =>
    prev.map((m) =>
      m.id === id ? { ...m, role } : m
    )
  );
};

const removeMember = async (id: string) => {
  if (!confirm("Remove this member?")) return;

  await api.delete(`/events/${slug}/team/${id}`);

  setMembers((prev) =>
    prev.filter((m) => m.id !== id)
  );
};


  /* ================= UI ================= */

  return (
    <PageShell
      title="Event Team"
      description="Manage who can access and operate this event"
    >
      <div className="space-y-6 max-w-5xl">
        {/* ================= INVITE ================= */}
        {(eventPhase === "PRE" || eventPhase === "ONGOING") && (
          <section className="bg-white border rounded-xl p-4 space-y-4">
            <h2 className="font-medium flex items-center gap-2">
              <UserPlus size={16} />
              Invite Team Member
            </h2>

            <div className="flex gap-3">
              <input
                value={inviteEmail}
                onChange={(e) =>
                  setInviteEmail(e.target.value)
                }
                placeholder="email@domain.com"
                className="flex-1 border rounded px-3 py-2 text-sm"
              />

              <select
                value={inviteRole}
                onChange={(e) =>
                  setInviteRole(
                    e.target.value as TeamRole
                  )
                }
                className="border rounded px-3 py-2 text-sm"
              >
                <option>Event Manager</option>
                <option>Content</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Volunteer</option>
              </select>

              <button
                onClick={inviteMember}
                className="bg-orange-600 text-white px-4 py-2 rounded text-sm"
              >
                Invite
              </button>
            </div>
          </section>
        )}

        {/* ================= MEMBERS LIST ================= */}
        <section className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">
                  Member
                </th>
                <th className="p-3 text-left">
                  Role
                </th>
                <th className="p-3 text-left">
                  Status
                </th>
                <th className="p-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {members.map((m) => (
                <tr
                  key={m.id}
                  className="border-b last:border-0"
                >
                  {/* MEMBER */}
                  <td className="p-3">
                    <div className="font-medium">
                      {m.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {m.email}
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="p-3">
                    {m.role === "Owner" ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        <Shield size={12} />
                        Owner
                      </span>
                    ) : (
                      <select
                        disabled={eventPhase !== "PRE" && eventPhase !== "ONGOING"}
                        value={m.role}
                        onChange={(e) =>
                          updateRole(
                            m.id,
                            e.target.value as TeamRole
                          )
                        }
                        className="border rounded px-2 py-1 text-xs"
                      >
                        <option>Event Manager</option>
                        <option>Content</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Volunteer</option>
                      </select>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    {m.status === "Active" ? (
                      <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
                        <CheckCircle size={12} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs">
                        <Clock size={12} />
                        Invited
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-right">
                    {m.role !== "Owner" && (
                      <button
                          disabled={eventPhase !== "PRE" && eventPhase !== "ONGOING"}
                          onClick={() =>
                            removeMember(m.id)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

       
      </div>
    </PageShell>
  );
}
