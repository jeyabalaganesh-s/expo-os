import {
  Mail,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type Campaign = {
  _id: string;
  name: string;
  subject: string;
  status: "Completed" | "Failed";
  audience: string; // All Users / Members / Segment
  stats: {
    total: number;
    sent: number;
    delivered: number;
    failed: number;
    opened?: number;
  };
  template?: {
    name: string;
    subject: string;
    html: string;
  };
  startedAt: string;
  completedAt: string;
  createdBy?: {
    name: string;
    role: "Admin" | "System";
  };
};

/* ================= PAGE ================= */

export default function CampaignRunDetailsPage() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!campaignId) return;

    api
      .get(`/email-campaigns/${campaignId}`)
      .then((res) => setCampaign(res.data))
      .finally(() => setLoading(false));
  }, [campaignId]);

  if (loading) return <div className="p-6">Loading campaign details…</div>;
  if (!campaign) return <div className="p-6">Campaign not found</div>;

  const deliveryRate =
    campaign.stats.sent > 0
      ? Math.round(
          (campaign.stats.delivered / campaign.stats.sent) * 100
        )
      : 0;

  const openRate =
    campaign.stats.opened && campaign.stats.delivered > 0
      ? Math.round(
          (campaign.stats.opened / campaign.stats.delivered) * 100
        )
      : null;

  return (
    <div className="p-6 space-y-10">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{campaign.name}</h2>
          <p className="text-sm text-gray-500">{campaign.subject}</p>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">
          Global Campaign
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard icon={Users} label="Audience" value={campaign.stats.total} />
        <StatCard icon={Mail} label="Sent" value={campaign.stats.sent} />
        <StatCard
          icon={CheckCircle}
          label="Delivered"
          value={campaign.stats.delivered}
        />
        <StatCard icon={XCircle} label="Failed" value={campaign.stats.failed} />
        <StatCard
          icon={CheckCircle}
          label="Delivery Rate"
          value={`${deliveryRate}%`}
        />
        {openRate !== null && (
          <StatCard icon={Eye} label="Open Rate" value={`${openRate}%`} />
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CAMPAIGN INFO */}
        <div className="space-y-4">
          <InfoRow label="Audience Type" value={campaign.audience} />
          <InfoRow
            label="Dispatch Started At"
            value={new Date(campaign.startedAt).toLocaleString()}
          />
          <InfoRow
            label="Dispatch Completed At"
            value={new Date(campaign.completedAt).toLocaleString()}
          />
          {campaign.createdBy && (
            <InfoRow
              label="Triggered By"
              value={`${campaign.createdBy.name} (${campaign.createdBy.role})`}
            />
          )}
        </div>

        {/* TEMPLATE PREVIEW */}
        {campaign.template && (
          <div className="border rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-gray-100 font-medium flex items-center gap-2">
              <Eye size={16} />
              Email Template Preview
            </div>
            <iframe
              title="Template Preview"
              srcDoc={campaign.template.html}
              className="w-full h-[420px] bg-white"
            />
          </div>
        )}
      </div>

      {/* EXECUTION TIMELINE */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock size={18} />
          Execution Timeline
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            📤 Dispatch initiated at{" "}
            {new Date(campaign.startedAt).toLocaleString()}
          </li>
          <li>
            ✅ Dispatch completed at{" "}
            {new Date(campaign.completedAt).toLocaleString()}
          </li>
        </ul>
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
  value: string | number;
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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
