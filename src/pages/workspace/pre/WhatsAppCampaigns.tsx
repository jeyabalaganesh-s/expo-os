import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import {
  Send,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";

/* ================= TYPES ================= */

type SendType = "Now" | "Schedule";
type CampaignStatus = "Draft" | "Scheduled" | "Sending" | "Completed";

type WhatsAppCampaign = {
  id: string;
  name: string;
  audience: string;
  message: string;
  sendType: SendType;
  scheduleAt?: string;
  status: CampaignStatus;
  sentCount: number;
  failedCount: number;
};

/* ================= COMPONENT ================= */

export default function WhatsAppCampaign() {
  // Later comes from Event Context
  const eventPhase: "PRE" | "ONGOING" | "POST" = "PRE";

  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  /* ================= LOAD ================= */

  useEffect(() => {
    showCreate && setShowCreate(false);
    // Replace with API
    setCampaigns([
      {
        id: "1",
        name: "Early Bird Reminder",
        audience: "Registered",
        message: "Reminder: Event starts soon!",
        sendType: "Schedule",
        scheduleAt: "2026-01-30 10:00",
        status: "Scheduled",
        sentCount: 0,
        failedCount: 0,
      },
      {
        id: "2",
        name: "Event Day Alert",
        audience: "All Attendees",
        message: "Welcome! Gates open at 9 AM.",
        sendType: "Now",
        status: "Completed",
        sentCount: 320,
        failedCount: 4,
      },
    ]);
  }, []);



  /* ================= UI ================= */

  return (
    <PageShell
      title="WhatsApp Campaigns"
      description="Send event updates via WhatsApp to participants"
    >
      <div className="space-y-6 max-w-6xl">
        {/* ================= HEADER ACTION ================= */}
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-sm text-gray-600">
            Campaign List
          </h2>

          {eventPhase !== "PRE" && (
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded text-sm"
            >
              <Plus size={14} />
              New Campaign
            </button>
          )}
        </div>

        {/* ================= CAMPAIGNS ================= */}
        <section className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Campaign</th>
                <th className="p-3 text-left">Audience</th>
                <th className="p-3 text-left">Send Type</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Result</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((c) => (
                <tr
                  key={c.id}
                  className="border-b last:border-0"
                >
                  {/* NAME */}
                  <td className="p-3">
                    <div className="font-medium">{c.name}</div>
                    {c.scheduleAt && (
                      <div className="text-xs text-gray-500">
                        {c.scheduleAt}
                      </div>
                    )}
                  </td>

                  {/* AUDIENCE */}
                  <td className="p-3">{c.audience}</td>

                  {/* SEND TYPE */}
                  <td className="p-3">
                    {c.sendType === "Now" ? (
                      <span className="inline-flex items-center gap-1 text-xs">
                        <Send size={12} />
                        Send Now
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs">
                        <Clock size={12} />
                        Scheduled
                      </span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        c.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : c.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : c.status === "Sending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {/* RESULT */}
                  <td className="p-3 text-xs">
                    <span className="text-green-600">
                      <CheckCircle size={12} className="inline" />{" "}
                      {c.sentCount}
                    </span>
                    {" / "}
                    <span className="text-red-600">
                      <XCircle size={12} className="inline" />{" "}
                      {c.failedCount}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-right">
                    <button
                      title="Preview"
                      className="hover:text-green-600"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {campaigns.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-500"
                  >
                    No WhatsApp campaigns yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* ================= POST EVENT NOTICE ================= */}
        {eventPhase === "PRE" && (
          <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-500">
            WhatsApp campaigns are disabled after the
            event is completed.
          </div>
        )}
      </div>
    </PageShell>
  );
}
