import { Eye, Edit, Ban } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type MemberStatus = "Active" | "Expired" | "Blocked";

type Member = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  membership: string;
  city: string;
  status: MemberStatus;
  joinedOn: string;
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

/* ================= STATUS STYLES ================= */

const statusStyle: Record<MemberStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Expired: "bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-700",
};

/* ================= COMPONENT ================= */

export default function AllMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    city: "",
    membership: "",
  });

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 10;

  /* ================= FETCH MEMBERS ================= */

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await api.get<ApiResponse>("/members", {
        params: {
          ...filters,
          page,
          limit: LIMIT,
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
  }, [filters, page]);

  // Reset page ONLY when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  /* ================= ACTIONS ================= */

  const handleBlock = async (id: string) => {
    if (!confirm("Block this member?")) return;

    try {
      await api.patch(`/members/${id}/block`);
      fetchMembers();
    } catch {
      alert("Failed to block member");
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            All Members
          </h1>
          <p className="text-sm text-gray-500">
            Manage and monitor all Expo OS members
          </p>
        </div>

        <Link
          to="/members/add"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          + Add Member
        </Link>
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
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Blocked">Blocked</option>
        </select>

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
          value={filters.membership}
          onChange={(e) =>
            setFilters({
              ...filters,
              membership: e.target.value,
            })
          }
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Memberships</option>
          <option>Starter</option>
          <option>Growth</option>
          <option>Elite</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Member</th>
              <th className="text-left p-3">Contact</th>
              <th className="text-left p-3">Membership</th>
              <th className="text-left p-3">City</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Joined On</th>
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
                  No members found
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
                    <div className="text-xs text-gray-500">
                      {member.id}
                    </div>
                  </td>

                  <td className="p-3">
                    <div>{member.email}</div>
                    <div className="text-xs text-gray-500">
                      {member.mobile}
                    </div>
                  </td>

                  <td className="p-3">{member.membership}</td>
                  <td className="p-3">{member.city}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[member.status]}`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(member.joinedOn).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2">
                      <Link
                        to={`/admin/members/${member.id}`}
                        title="View"
                        className="p-1 hover:text-orange-600"
                      >
                        <Eye size={16} />
                      </Link>

                      <Link
                        to={`/admin/members/${member.id}/edit`}
                        title="Edit"
                        className="p-1 hover:text-blue-600"
                      >
                        <Edit size={16} />
                      </Link>

                      {member.status !== "Blocked" && (
                        <button
                          onClick={() => handleBlock(member.id)}
                          title="Block Member"
                          className="p-1 hover:text-red-600"
                        >
                          <Ban size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER / PAGINATION ================= */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          Showing {members.length} of {total} members
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page * LIMIT >= total}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
