import {
  Eye,
  RefreshCw,
  Mail,
  MessageSquare,
  X,
} from "lucide-react";
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
  expiredOn: string;
  expiredDays: number;
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

const expiryTag = (days: number) => {
  if (days <= 15) return "bg-orange-100 text-orange-700";
  if (days <= 30) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

/* ================= COMPONENT ================= */

export default function ExpiredMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    range: "",
  });

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  /* ================= CAMPAIGN MODAL ================= */

  const [openCampaign, setOpenCampaign] = useState(false);
  const [campaignRange, setCampaignRange] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [offer, setOffer] = useState("");
  const [message, setMessage] = useState("");

  /* ================= FETCH MEMBERS ================= */

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await api.get<ApiResponse>("/members/expired", {
        params: {
          ...filters,
          page,
          limit: 10,
        },
      });

      setMembers(res.data.data);
      setTotal(res.data.pagination.total);
    } catch (err) {
      console.error("Failed to load expired members", err);
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

  /* ================= CAMPAIGN ================= */

  const toggleChannel = (c: string) => {
    setChannels((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const launchCampaign = async () => {
    if (!campaignRange || channels.length === 0) return;

    await api.post("/campaigns/renewal/expired", {
      expiredRange: campaignRange,
      channels,
      offer,
      message,
    });

    setOpenCampaign(false);
    setCampaignRange("");
    setChannels([]);
    setOffer("");
    setMessage("");
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Expired Members
          </h1>
          <p className="text-sm text-gray-500">
            Members whose memberships have expired
          </p>
        </div>

        <button
          onClick={() => setOpenCampaign(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          Send Renewal Campaign
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
          value={filters.range}
          onChange={(e) =>
            setFilters({ ...filters, range: e.target.value })
          }
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Expired Duration</option>
          <option value="15">0–15 days</option>
          <option value="30">16–30 days</option>
          <option value="60">30+ days</option>
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
              <th className="text-left p-3">Expired On</th>
              <th className="text-left p-3">Expired Days</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Loading expired members...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No expired members found
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
                      to={`/members/${member.id}`}
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
                    {new Date(member.expiredOn).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${expiryTag(
                        member.expiredDays
                      )}`}
                    >
                      {member.expiredDays} days
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2">
                      <Eye size={16} />
                      <RefreshCw size={16} />
                      <Mail size={16} />
                      <MessageSquare size={16} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Showing {members.length} of {total} expired members
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

      {/* ================= CAMPAIGN MODAL ================= */}
      {openCampaign && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Renewal Campaign
              </h2>
              <button onClick={() => setOpenCampaign(false)}>
                <X size={18} />
              </button>
            </div>

            <select
              value={campaignRange}
              onChange={(e) => setCampaignRange(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-full"
            >
              <option value="">Select Expired Segment</option>
              <option value="15">0–15 days expired</option>
              <option value="30">16–30 days expired</option>
              <option value="60">30+ days expired</option>
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

            <select
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-full"
            >
              <option value="">Select Offer (Optional)</option>
              <option value="500">₹500 Renewal Discount</option>
              <option value="10%">10% Limited Offer</option>
            </select>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Campaign message preview..."
              className="border rounded-md px-3 py-2 text-sm w-full"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenCampaign(false)}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={launchCampaign}
                className="px-4 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Launch Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
