import { Users, Eye, CheckCircle, XCircle, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type Campaign = {
  _id: string;
  name: string;
  subject: string;
  status: "Completed" | "Failed";
  audience: string;
  stats: {
    total: number;
    sent: number;
    delivered: number;
    failed: number;
  };
  startedAt: string;
  completedAt: string;
};

/* ================= PAGE ================= */

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | "Completed" | "Failed">("All");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    api
      .get("/email-campaigns")
      .then((res) => setCampaigns(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  /* ================= DERIVED DATA ================= */

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.subject.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [campaigns, search, statusFilter]);

  const totalPages = Math.ceil(filteredCampaigns.length / pageSize);

  const paginatedCampaigns = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCampaigns.slice(start, start + pageSize);
  }, [filteredCampaigns, page, pageSize]);

  const stats = useMemo(() => {
    return filteredCampaigns.reduce(
      (acc, c) => {
        acc.sent += c.stats.sent;
        acc.delivered += c.stats.delivered;
        acc.failed += c.stats.failed;
        return acc;
      },
      { sent: 0, delivered: 0, failed: 0 }
    );
  }, [filteredCampaigns]);

  if (loading) {
    return <div className="p-6">Loading campaigns…</div>;
  }

  /* ================= RENDER ================= */

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold">Email Campaigns</h2>
        <p className="text-sm text-gray-500">
          Global email campaigns executed across the platform
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Mail} label="Campaigns" value={filteredCampaigns.length} />
        <StatCard icon={Mail} label="Sent" value={stats.sent} />
        <StatCard icon={CheckCircle} label="Delivered" value={stats.delivered} />
        <StatCard icon={XCircle} label="Failed" value={stats.failed} />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search campaign..."
          className="border rounded px-3 py-2 text-sm w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border rounded px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as any);
            setPage(1);
          }}
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          className="border rounded px-3 py-2 text-sm"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Campaign</th>
              <th className="text-left px-4 py-3">Audience</th>
              <th className="text-center px-4 py-3">Sent</th>
              <th className="text-center px-4 py-3">Delivered</th>
              <th className="text-center px-4 py-3">Failed</th>
              <th className="text-center px-4 py-3">Status</th>
              <th className="text-center px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCampaigns.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No campaigns found
                </td>
              </tr>
            )}

            {paginatedCampaigns.map((campaign) => (
              <tr
                key={campaign._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-xs text-gray-500">
                    {campaign.subject}
                  </div>
                </td>

                <td className="px-4 py-3 flex items-center gap-2">
                  <Users size={14} />
                  {campaign.audience}
                </td>

                <td className="px-4 py-3 text-center">
                  {campaign.stats.sent}
                </td>

                <td className="px-4 py-3 text-center text-green-600">
                  {campaign.stats.delivered}
                </td>

                <td className="px-4 py-3 text-center text-red-600">
                  {campaign.stats.failed}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <Link
                    to={`/admin/comm/campaigns/${campaign._id}`}
                    className="inline-flex items-center gap-1 text-purple-600 hover:underline"
                  >
                    <Eye size={14} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between text-sm">
        <div>
          Page {page} of {totalPages || 1}
        </div>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages || totalPages === 0}
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

/* ================= HELPERS ================= */

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: number;
}) {
  return (
    <div className="border rounded-lg p-4 flex items-center gap-4">
      <Icon className="text-purple-600" size={22} />
      <div>
        <div className="text-lg font-bold">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}
