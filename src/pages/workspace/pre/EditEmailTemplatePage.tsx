import PageShell from "../../../components/workspace/PageShell";
import { Save, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

type TemplateStatus = "Draft" | "Active" | "Archived";

export default function EditEmailTemplatePage() {
  const navigate = useNavigate();
  const { templateId } = useParams();

  /* ================= STATE ================= */

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [status, setStatus] =
    useState<TemplateStatus>("Draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD TEMPLATE ================= */

  useEffect(() => {
    if (!templateId) return;

    api
      .get(`/workspace/events/email-templates/${templateId}`)
      .then((res) => {
        const t = res.data;
        setName(t.name);
        setSubject(t.subject);
        setHtml(t.html);
        setStatus(t.status || "Draft");
      })
      .catch(() => {
        alert("Failed to load template");
        navigate(-1);
      })
      .finally(() => setLoading(false));
  }, [templateId, navigate]);

  /* ================= SAVE ================= */

  const saveTemplate = async () => {
    if (!name || !subject || !html) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);

      await api.put(
        `/workspace/events/email-templates/${templateId}`,
        {
          name,
          subject,
          html,
          status,
        }
      );

      navigate("/workspace/campaigns/email");
    } catch (err) {
      console.error(err);
      alert("Failed to update template");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  /* ================= RENDER ================= */

  return (
    <PageShell
      title="Edit Email Template"
      description="Update email template content and settings"
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
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Email Subject *
            </label>
            <input
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as TemplateStatus
                )
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
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
            onChange={(e) =>
              setHtml(e.target.value)
            }
            className="w-full min-h-[350px] border rounded-lg px-3 py-2 font-mono text-sm"
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
            {saving ? "Saving..." : "Update Template"}
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
