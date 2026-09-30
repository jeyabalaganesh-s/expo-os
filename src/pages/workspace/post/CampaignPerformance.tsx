import { useEffect, useState } from "react";
import {
  Mail,
  CheckCircle,
  Eye,
  MousePointerClick,
  Users,
} from "lucide-react";

/* ================= TYPES ================= */

type Campaign = {
  id: string;
  name: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  conversions: number;
};

/* ================= MOCK DATA ================= */

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    name: "Webinar Reminder – Day Before",
    sent: 600,
    delivered: 580,
    opened: 420,
    clicked: 210,
    conversions: 145,
  },
  {
    id: "c2",
    name: "Thank You Email",
    sent: 320,
    delivered: 315,
    opened: 280,
    clicked: 90,
    conversions: 60,
  },
];

/* ================= COMPONENT ================= */

export default function WorkspaceCampaignPerformance() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem(
      "event_campaign_performance"
    );
    setCampaigns(
      saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS
    );
  }, []);

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Campaign Performance
        </h1>
        <p className="text-sm text-gray-500">
          Post-event email & message campaign analytics
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SummaryCard
          label="Total Sent"
          value={sum(campaigns, "sent")}
          icon={Mail}
        />
        <SummaryCard
          label="Delivered"
          value={sum(campaigns, "delivered")}
          icon={CheckCircle}
        />
        <SummaryCard
          label="Opened"
          value={sum(campaigns, "opened")}
          icon={Eye}
        />
        <SummaryCard
          label="Clicked"
          value={sum(campaigns, "clicked")}
          icon={MousePointerClick}
        />
        <SummaryCard
          label="Conversions"
          value={sum(campaigns, "conversions")}
          icon={Users}
        />
      </div>

      {/* CAMPAIGN TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Campaign</th>
              <th className="p-3 text-right">Sent</th>
              <th className="p-3 text-right">Opened</th>
              <th className="p-3 text-right">Clicked</th>
              <th className="p-3 text-right">Open Rate</th>
              <th className="p-3 text-right">CTR</th>
              <th className="p-3 text-right">Conversions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c) => {
              const openRate = rate(c.opened, c.delivered);
              const ctr = rate(c.clicked, c.opened);

              return (
                <tr
                  key={c.id}
                  className="border-b last:border-0"
                >
                  <td className="p-3 font-medium">
                    {c.name}
                  </td>
                  <td className="p-3 text-right">
                    {c.sent}
                  </td>
                  <td className="p-3 text-right">
                    {c.opened}
                  </td>
                  <td className="p-3 text-right">
                    {c.clicked}
                  </td>
                  <td className="p-3 text-right">
                    {openRate}%
                  </td>
                  <td className="p-3 text-right">
                    {ctr}%
                  </td>
                  <td className="p-3 text-right">
                    {c.conversions}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function sum(
  list: any[],
  key: keyof Campaign
) {
  return list.reduce(
    (total, item) => total + item[key],
    0
  );
}

function rate(value: number, total: number) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({
  label,
  value,
  icon: Icon,
}: any) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
      <div className="p-3 bg-orange-100 text-orange-700 rounded-lg">
        <Icon size={20} />
      </div>

      <div>
        <div className="text-xs text-gray-500">
          {label}
        </div>
        <div className="text-xl font-semibold text-gray-900">
          {value}
        </div>
      </div>
    </div>
  );
}
