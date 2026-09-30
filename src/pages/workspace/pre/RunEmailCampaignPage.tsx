import PageShell from "../../../components/workspace/PageShell";
import { ArrowLeft, Send, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";

/* ================= TYPES ================= */

type EmailTemplate = {
  _id: string;
  name: string;
  subject: string;
};

type AudienceType = "All Registrations" | "Checked-in Users";

/* ================= PAGE ================= */

export default function RunEmailCampaignPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const presetTemplateId = searchParams.get("templateId");

  /* ===== extract slug ===== */
  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= STATE ================= */

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState<string | null>(
    presetTemplateId
  );
  const [audience, setAudience] =
    useState<AudienceType>("All Registrations");
  const [sendType, setSendType] =
    useState<"now" | "schedule">("now");
  const [scheduledAt, setScheduledAt] = useState("");
  const [saving, setSaving] = useState(false);

  /* ================= LOAD ================= */

  useEffect(() => {
    api
      .get(`/workspace/events/${slug}/email-templates`)
      .then((res) => setTemplates(res.data));
  }, []);

  /* ================= CREATE ================= */

  const createCampaign = async () => {
    if (!name || !templateId) {
      alert("Campaign name and template are required");
      return;
    }

    if (sendType === "schedule" && !scheduledAt) {
      alert("Please select schedule date & time");
      return;
    }

    try {
      setSaving(true);

      const res = await api.post(
        `/workspace/events/${slug}/email-campaigns`,
        {
          name,
          templateId,
          audience,
          scheduledAt:
            sendType === "schedule"
              ? scheduledAt
              : null,
        }
      );

      // If send now → trigger send
      if (sendType === "now") {
        await api.post(
          `/workspace/events/email-campaigns/${res.data._id}/send`
        );
      }

      navigate("/workspace/email/campaigns");
    } catch (err) {
      console.error(err);
      alert("Failed to create campaign");
    } finally {
      setSaving(false);
    }
  };

  /* ================= RENDER ================= */

  return (
    <PageShell
      title="Run Email Campaign"
      description="Send an email template to your event audience"
      actions={[
        {
          label: "Back",
          icon: <ArrowLeft size={14} />,
          onClick: () => navigate(-1),
        },
      ]}
    >
      <div className="max-w-3xl space-y-8">
        {/* ================= CAMPAIGN INFO ================= */}
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">
            Campaign Details
          </h3>

          <div>
            <label className="block text-sm mb-1">
              Campaign Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Webinar Reminder – 1 Day Before"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Email Template *
            </label>
            <select
              value={templateId || ""}
              onChange={(e) =>
                setTemplateId(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">
                Select a template
              </option>
              {templates.map((t) => (
                <option
                  key={t._id}
                  value={t._id}
                >
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= AUDIENCE ================= */}
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">
            Audience
          </h3>

          <select
            value={audience}
            onChange={(e) =>
              setAudience(e.target.value as AudienceType)
            }
            className="border rounded-lg px-3 py-2"
          >
            <option>
              All Registrations
            </option>
            <option>
              Checked-in Users
            </option>
          </select>

          <p className="text-xs text-gray-500">
            Advanced segmentation coming soon
          </p>
        </div>

        {/* ================= SEND OPTIONS ================= */}
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">
            Send Options
          </h3>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={sendType === "now"}
                onChange={() =>
                  setSendType("now")
                }
              />
              Send Now
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={sendType === "schedule"}
                onChange={() =>
                  setSendType("schedule")
                }
              />
              Schedule
            </label>
          </div>

          {sendType === "schedule" && (
            <div>
              <label className="block text-sm mb-1">
                Schedule Date & Time
              </label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) =>
                  setScheduledAt(e.target.value)
                }
                className="border rounded-lg px-3 py-2"
              />
            </div>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex gap-3">
          <button
            onClick={createCampaign}
            disabled={saving}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg flex items-center gap-2"
          >
            {sendType === "now" ? (
              <Send size={16} />
            ) : (
              <Clock size={16} />
            )}
            {saving
              ? "Processing..."
              : sendType === "now"
              ? "Send Campaign"
              : "Schedule Campaign"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </PageShell>
  );
}
