import PageShell from "../../../components/workspace/PageShell";
import {
  Mail,
  CheckCircle,
  XCircle,
  Eye,
  Copy,
  Send,
  Plus,
  FileText,
  X,
  Pencil,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

type CampaignStatus =
  | "Draft"
  | "Scheduled"
  | "Sending"
  | "Completed"
  | "Failed";

type EmailCampaign = {
  _id: string;
  name: string;
  audience: string;
  status: CampaignStatus;
  scheduledAt?: string;
  createdAt: string;
  templateId?: {
    _id: string;
    name: string;
    html?: string;
  };
  stats?: {
    sent: number;
    opened: number;
  };
};

type EmailTemplate = {
  _id: string;
  name: string;
  subject: string;
  html: string;
  status: "Draft" | "Active" | "Archived";
};

/* ================= STATUS STYLE ================= */

const statusStyle: Record<CampaignStatus, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Scheduled: "bg-yellow-100 text-yellow-700",
  Sending: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Failed: "bg-red-100 text-red-700",
};

/* ================= PAGE ================= */

export default function EmailCampaignsPage() {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  /* ===== extract slug ===== */
  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= LOAD ================= */

   /* ================= LOAD ================= */

  const loadData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }

    const [campaignRes, templateRes] = await Promise.all([
      api.get(`/workspace/events/${slug}/email-campaigns`),
      api.get(`/workspace/events/${slug}/email-templates`),
    ]);

    setCampaigns(campaignRes.data);
    setTemplates(templateRes.data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData(false);
    };

    void fetchData();
  }, []);

  /* ================= ACTIONS ================= */

  const sendNow = async (id: string) => {
    await api.post(`/workspace/events/email-campaigns/${id}/send`);
    loadData();
  };

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  return (
    <PageShell
      title="Email Campaigns"
      description="Create email templates and run campaigns for this event"
      actions={[
        {
          label: "Create Template",
          onClick: () =>
            navigate(`/workspace/email/templates/create`),
        },
        {
          label: "Create Campaign",
          onClick: () =>
            navigate(`/workspace/email/campaigns/create`),
        },
      ]}
    >
      {/* ================= TEMPLATES ================= */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">
            Email Templates
          </h3>

          <button
            onClick={() =>
              navigate(`/workspace/email/templates/create`)
            }
            className="px-3 py-2 text-sm border rounded-lg flex items-center gap-1"
          >
            <Plus size={14} />
            Add Template
          </button>
        </div>

        {templates.length === 0 ? (
          <div className="border rounded-lg p-6 text-sm text-gray-500">
            No templates created yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {templates.map((t) => (
              <div
                key={t._id}
                className="border rounded-lg p-4 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 font-medium">
                    <FileText size={16} />
                    {t.name}
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    {t.subject}
                  </div>

                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-gray-100">
                    {t.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/workspace/email/campaigns/create?templateId=${t._id}`
                      )
                    }
                    className="px-3 py-2 text-xs bg-orange-600 text-white rounded-lg flex items-center gap-1"
                  >
                    <Send size={14} />
                    Run
                  </button>

                  <button
                    onClick={() => setPreviewHtml(t.html)}
                    className="px-3 py-2 text-xs border rounded-lg flex items-center gap-1"
                  >
                    <Eye size={14} />
                    Preview
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/workspace/email/templates/${t._id}/edit`
                      )
                    }
                    className="px-3 py-2 text-xs border rounded-lg flex items-center gap-1"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= CAMPAIGNS ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Campaign</th>
              <th className="p-3 text-left">Template</th>
              <th className="p-3 text-left">Audience</th>
              <th className="p-3 text-left">Performance</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c._id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  {c.name}
                </td>

                <td className="p-3">
                  {c.templateId?.name || "-"}
                </td>

                <td className="p-3">
                  <Mail size={14} className="inline mr-1" />
                  {c.audience}
                </td>

                <td className="p-3 text-xs">
                  {c.stats?.sent ? (
                    <>
                      <div>Sent: {c.stats.sent}</div>
                      <div>Opened: {c.stats.opened}</div>
                    </>
                  ) : (
                    <span className="text-gray-400">
                      Not sent yet
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${statusStyle[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    {c.templateId?.html && (
                      <IconButton
                        title="Preview Email"
                        onClick={() =>
                          setPreviewHtml(
                            c.templateId?.html || ""
                          )
                        }
                      >
                        <Eye size={16} />
                      </IconButton>
                    )}

                    <IconButton
                      title="View Campaign Details"
                      onClick={() =>
                        navigate(
                          `/workspace/campaigns/email/${c._id}`
                        )
                      }
                    >
                      <Info size={16} />
                    </IconButton>

                    {c.status === "Draft" && (
                      <IconButton
                        title="Send Now"
                        onClick={() => sendNow(c._id)}
                      >
                        <Send size={16} />
                      </IconButton>
                    )}

                    <IconButton title="Duplicate">
                      <Copy size={16} />
                    </IconButton>

                    {c.status === "Completed" && (
                      <CheckCircle
                        size={16}
                        className="text-green-600"
                      />
                    )}
                    {c.status === "Failed" && (
                      <XCircle
                        size={16}
                        className="text-red-600"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {previewHtml && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold">
                Email Preview
              </h3>
              <button onClick={() => setPreviewHtml(null)}>
                <X size={18} />
              </button>
            </div>

            <iframe
              title="Email Preview"
              srcDoc={previewHtml}
              className="w-full h-[70vh] border-0"
            />
          </div>
        </div>
      )}
    </PageShell>
  );
}

/* ================= BUTTON ================= */

function IconButton({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-1 text-gray-600 hover:text-orange-600"
    >
      {children}
    </button>
  );
}
