import { useEffect, useState } from "react";
import api from "../../../utils/api";
import {
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

type PaymentStatus = "PAID" | "FAILED" | "PENDING";
type ApplicationStatus = "Pending" | "Approved" | "Rejected";

type Registration = {
  _id: string;
  fullName: string;
  email: string;
  membershipPlanId?: {
    name: string;
  };
  status: ApplicationStatus;
  payment?: {
    status: PaymentStatus;
    orderId?: string;
    paymentId?: string;
  };
};


/* ================= COMPONENT ================= */

export default function MembershipRegistrationsPage() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    plan: "",
    payment: "",
    status: "",
  });

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 10;

  const [selected, setSelected] = useState<string[]>([]);

  /* ================= FETCH ================= */

 const fetchData = async () => {
  try {
    setLoading(true);

    const res = await api.get(
      "/admin/memberships/registrations",
      {
        params: {
          ...filters,
          page,
          limit: LIMIT,
        },
      }
    );

    const list = Array.isArray(res.data)
      ? res.data
      : res.data.data || [];

    setRows(list);
    setTotal(res.data.pagination?.total || list.length);
  } catch (err) {
    console.error("Failed to fetch registrations", err);
    setRows([]);
    setTotal(0);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchData();
  }, [filters, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  /* ================= ACTIONS ================= */

  const handleApprove = async (id: string) => {
    if (!confirm("Approve this membership?")) return;

    await api.post(
      `/admin/memberships/registrations/${id}/approve`
    );

    setRows((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "Approved" } : r
      )
    );
  };

  const handleReject = async (id: string) => {
    if (!confirm("Reject this membership?")) return;

    await api.post(
      `/admin/memberships/registrations/${id}/reject`
    );

    setRows((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "Rejected" } : r
      )
    );
  };

  /* ================= BULK ================= */

  const bulkAction = async (action: "approve" | "reject") => {
    if (selected.length === 0) return;

    if (
      !confirm(
        `${action === "approve" ? "Approve" : "Reject"} ${
          selected.length
        } selected applications?`
      )
    )
      return;

    await api.post(
      `/admin/memberships/registrations/bulk-${action}`,
      { ids: selected }
    );

    setRows((prev) =>
      prev.map((r) =>
        selected.includes(r._id)
          ? {
              ...r,
              status:
                action === "approve"
                  ? "Approved"
                  : "Rejected",
            }
          : r
      )
    );

    setSelected([]);
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Membership Registrations
          </h1>
          <p className="text-sm text-gray-500">
            Review applications & payment status
          </p>
        </div>

        <button
          onClick={fetchData}
          className="flex items-center gap-2 text-sm border px-3 py-2 rounded"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search name / email"
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
          <option value="">All Applications</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={filters.payment}
          onChange={(e) =>
            setFilters({ ...filters, payment: e.target.value })
          }
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Payments</option>
          <option value="PAID">Paid</option>
          <option value="FAILED">Failed</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* ================= BULK ACTIONS ================= */}
      {selected.length > 0 && (
        <div className="flex gap-3 text-sm">
          <button
            onClick={() => bulkAction("approve")}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Approve Selected
          </button>
          <button
            onClick={() => bulkAction("reject")}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Reject Selected
          </button>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto border rounded-lg bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={
                    rows.length > 0 &&
                    selected.length === rows.length
                  }
                  onChange={(e) =>
                    setSelected(
                      e.target.checked
                        ? rows.map((r) => r._id)
                        : []
                    )
                  }
                />
              </th>
              <th className="p-3">Applicant</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Application</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  Loading registrations...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  No registrations found
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const payment = r.payment?.status ?? "PENDING";

                return (
                  <tr key={r._id} className="border-t">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(r._id)}
                        onChange={() =>
                          setSelected((prev) =>
                            prev.includes(r._id)
                              ? prev.filter(
                                  (x) => x !== r._id
                                )
                              : [...prev, r._id]
                          )
                        }
                      />
                    </td>

                    <td className="p-3">
                      <div className="font-medium">
                        {r.fullName}
                      </div>
                      <div className="text-gray-500">
                        {r.email}
                      </div>
                    </td>

                    <td className="p-3">
                      {r.membershipPlanId?.name || "—"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          payment === "PAID"
                            ? "bg-green-100 text-green-700"
                            : payment === "FAILED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment}
                      </span>
                    </td>

                    <td className="p-3">{r.status}</td>

                    <td className="p-3 flex gap-2">
                      <button
                        className="p-2 border rounded"
                        onClick={() =>
                          navigate(
                            `/memberships/registrations/${r._id}`
                          )
                        }
                      >
                        <Eye size={14} />
                      </button>

                      {payment === "PAID" &&
                        r.status === "Pending" && (
                          <>
                            <button
                              className="p-2 border rounded text-green-600"
                              onClick={() =>
                                handleApprove(r._id)
                              }
                            >
                              <CheckCircle size={14} />
                            </button>

                            <button
                              className="p-2 border rounded text-red-600"
                              onClick={() =>
                                handleReject(r._id)
                              }
                            >
                              <XCircle size={14} />
                            </button>
                          </>
                        )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER / PAGINATION ================= */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Showing {rows.length} of {total} applications
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
