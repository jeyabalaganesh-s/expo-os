import { Eye, Unlock, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type BlockReason =
  | "Payment Dispute"
  | "Policy Violation"
  | "Manual Admin Block"
  | "Fraud Suspected";

type Member = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  membership: string;
  blockedOn: string;
  reason: BlockReason;
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

const reasonStyle: Record<BlockReason, string> = {
  "Payment Dispute": "bg-yellow-100 text-yellow-700",
  "Policy Violation": "bg-red-100 text-red-700",
  "Manual Admin Block": "bg-gray-100 text-gray-700",
  "Fraud Suspected": "bg-purple-100 text-purple-700",
};

/* ================= COMPONENT ================= */

export default function BlockedMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    reason: "",
  });

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  /* ================= FETCH MEMBERS ================= */

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await api.get<ApiResponse>("/members/blocked", {
        params: {
          ...filters,
          page,
          limit: 10,
        },
      });

      setMembers(res.data.data);
      setTotal(res.data.pagination.total);
    } catch (err) {
      console.error("Failed to fetch blocked members", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [filters, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  /* ================= UNBLOCK ================= */

  const handleUnblock = async (id: string) => {
    if (!confirm("Are you sure you want to unblock this member?")) return;

    try {
      await api.patch(`/members/${id}/unblock`);
      fetchMembers();
    } catch (err) {
      alert("Failed to unblock member");
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Blocked Members
          </h1>
          <p className="text-sm text-gray-500">
            Members restricted due to policy, security, or payment issues
          </p>
        </div>

        <Link
          to="/admin/members/security-review"
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 flex items-center gap-2"
        >
          <ShieldAlert size={16} />
          Security Review
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
          value={filters.reason}
          onChange={(e) =>
            setFilters({ ...filters, reason: e.target.value })
          }
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Reasons</option>
          <option>Payment Dispute</option>
          <option>Policy Violation</option>
          <option>Fraud Suspected</option>
          <option>Manual Admin Block</option>
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
              <th className="text-left p-3">Blocked On</th>
              <th className="text-left p-3">Reason</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Loading blocked members...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No blocked members found
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

                  <td className="p-3">{member.city}</td>
                  <td className="p-3">{member.membership}</td>
                  <td className="p-3">
                    {new Date(member.blockedOn).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${reasonStyle[member.reason]}`}
                    >
                      {member.reason}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2">
                      <Link
                        to={`/admin/members/${member.id}`}
                        title="View Profile"
                        className="p-1 hover:text-orange-600"
                      >
                        <Eye size={16} />
                      </Link>

                      <button
                        onClick={() => handleUnblock(member.id)}
                        title="Unblock Member"
                        className="p-1 hover:text-green-600"
                      >
                        <Unlock size={16} />
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
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          Showing {members.length} of {total} blocked members
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
            disabled={page * 10 >= total}
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
