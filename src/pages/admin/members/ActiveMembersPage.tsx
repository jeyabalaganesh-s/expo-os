// src/pages/members/ActiveMembersPage.tsx
import { Eye, Edit, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

/* ================= TYPES ================= */
type Member = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  membership: string;
  city: string;
  expiresOn: string;
  daysLeft: number;
};

type ApiResponse = {
  success: boolean;
  data: Member[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

/* ================= UTILS ================= */
const expiryColor = (days: number) => {
  if (days <= 15) return "text-red-600";
  if (days <= 30) return "text-yellow-600";
  return "text-green-600";
};

/* ================= COMPONENT ================= */
export default function ActiveMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    expiry: "",
  });

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [openReminder, setOpenReminder] = useState(false);
  const [reminderRange, setReminderRange] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  /* ================= FETCH MEMBERS ================= */
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await api.get<ApiResponse>("/members/active", {
        params: {
          ...filters,
          page,
          limit: 10,
        },
      });

      setMembers(res.data.data);
      setTotal(res.data.pagination.total);
    } catch (err) {
      console.error("Failed to load members", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    setPage(1);
  }, [filters, page]);

  /* ================= REMINDER ================= */
  const handleSendReminder = async () => {
    if (!reminderRange || channels.length === 0) return;

    await api.post("/api/reminders/renewal", {
      expiryRange: reminderRange,
      channels,
      message,
    });

    setOpenReminder(false);
    setReminderRange("");
    setChannels([]);
    setMessage("");
  };

  const toggleChannel = (value: string) => {
    setChannels((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Active Members
          </h1>
          <p className="text-sm text-gray-500">
            Members with valid and running memberships
          </p>
        </div>

        <button
          onClick={() => setOpenReminder(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          Send Renewal Reminder
        </button>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search name / email / mobile"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select
          value={filters.city}
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value })
          }
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Cities</option>
          <option>Coimbatore</option>
          <option>Chennai</option>
          <option>Bangalore</option>
        </select>

        <select
          value={filters.expiry}
          onChange={(e) =>
            setFilters({ ...filters, expiry: e.target.value })
          }
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Expiry Timeline</option>
          <option value="15">Expiring in 15 days</option>
          <option value="30">Expiring in 30 days</option>
          <option value="60">Expiring in 60 days</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Member</th>
              <th className="text-left p-3">Contact</th>
              <th className="text-left p-3">City</th>
              <th className="text-left p-3">Membership</th>
              <th className="text-left p-3">Expires On</th>
              <th className="text-left p-3">Days Left</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Loading members...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No active members found
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <Link
                      to={`/admin/members/${member.id}`}
                      className="font-medium text-orange-600 hover:underline"
                    >
                      {member.name}
                    </Link>
                    <div className="text-xs text-gray-500">{member.id}</div>
                  </td>

                  <td className="p-3">
                    <div>{member.email}</div>
                    <div className="text-xs text-gray-500">
                      {member.mobile}
                    </div>
                  </td>

                  <td className="p-3">{member.city}</td>
                  <td className="p-3">{member.membership}</td>
                  <td className="p-3">
                    {new Date(member.expiresOn).toLocaleDateString()}
                  </td>

                  <td
                    className={`p-3 font-semibold ${expiryColor(
                      member.daysLeft
                    )}`}
                  >
                    {member.daysLeft} days
                  </td>

                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2">
                      <button className="p-1 hover:text-orange-600">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 hover:text-blue-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 hover:text-green-600">
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Showing {members.length} of {total} active members
      </div>

      {/* ================= REMINDER MODAL ================= */}
      {openReminder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Send Renewal Reminder
              </h2>
              <button onClick={() => setOpenReminder(false)}>
                <X size={18} />
              </button>
            </div>

            <select
              value={reminderRange}
              onChange={(e) => setReminderRange(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-full"
            >
              <option value="">Select Expiry Range</option>
              <option value="15">Expiring in 15 days</option>
              <option value="30">Expiring in 30 days</option>
              <option value="60">Expiring in 60 days</option>
            </select>

            <div className="flex gap-4 text-sm">
              {["email", "whatsapp", "sms"].map((c) => (
                <label key={c} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={channels.includes(c)}
                    onChange={() => toggleChannel(c)}
                  />
                  {c.toUpperCase()}
                </label>
              ))}
            </div>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Reminder message preview..."
              className="border rounded-md px-3 py-2 text-sm w-full"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenReminder(false)}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReminder}
                className="px-4 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
