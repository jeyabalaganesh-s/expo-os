import PageShell from "../../../components/workspace/PageShell";
import { Save, ArrowLeft } from "lucide-react";
import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreateEmailTemplatePage() {
  const navigate = useNavigate();

  /* ===== extract slug ===== */
  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= STATE ================= */

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState<"Draft" | "Active">("Draft");
  const [saving, setSaving] = useState(false);

  /* ================= SAVE ================= */

  const saveTemplate = async () => {
    if (!name || !subject || !html) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);

      await api.post(`/workspace/events/${slug}/email-templates`, {
        name,
        subject,
        html: html,     // ✅ FIX: backend expects `body`
        status,
      });

      navigate("/workspace/events/email-campaigns");
    } catch (err) {
      console.error(err);
      alert("Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  /* ================= RENDER ================= */

  return (
    <PageShell
      title="Create Email Template"
      description="Design an email template to use in campaigns for this event"
      actions={[
        {
          label: "Back",
          icon: <ArrowLeft size={14} />,
          onClick: () => navigate(-1),
        },
      ]}
    >
      <div className="max-w-4xl space-y-8">
        {/* ================= BASIC INFO ================= */}
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">
            Template Details
          </h3>

          <div>
            <label className="block text-sm mb-1">
              Template Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Reminder – 3 Days Before"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Email Subject *
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Your event starts in 3 days ⏰"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Draft" | "Active")
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>

        {/* ================= HTML EDITOR ================= */}
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">
            Email Content (HTML)
          </h3>

          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full min-h-[300px] border rounded-lg px-3 py-2 font-mono text-sm"
            placeholder={`<h1>Hello {{name}}</h1>
<p>Welcome to {{event_title}}</p>`}
          />

          <div className="text-xs text-gray-500">
            Available variables:
            <span className="ml-2 font-mono">
              {`{{name}}, {{email}}, {{event_title}}, {{event_date}}`}
            </span>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex gap-3">
          <button
            onClick={saveTemplate}
            disabled={saving}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg flex items-center gap-2"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Template"}
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
