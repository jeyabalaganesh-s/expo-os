import { Eye, Edit, Trash2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";

type TemplateStatus = "Draft" | "Approved" | "Disabled";
type TemplateCategory =
  | "Membership"
  | "Events"
  | "Webinars"
  | "Payments"
  | "System";

type EmailTemplate = {
  _id: string;
  name: string;
  subject: string;
  category: TemplateCategory;
  status: TemplateStatus;
  htmlBody: string;
  updatedAt: string;
};

const statusStyle: Record<TemplateStatus, string> = {
  Draft: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Disabled: "bg-gray-100 text-gray-600",
};

export default function EmailTemplatesPage() {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] =
    useState<EmailTemplate | null>(null);

  /* ================= FETCH ================= */
  const fetchTemplates = async () => {
    try {
      const res = await api.get("/email-templates");
      setTemplates(res.data);
    } catch {
      alert("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  /* ================= DELETE ================= */
  const deleteTemplate = async (id: string) => {
    if (!confirm("Delete this template?")) return;
    await api.delete(`/email-templates/${id}`);
    fetchTemplates();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Email Templates</h1>
          <p className="text-sm text-gray-500">
            Manage reusable email templates
          </p>
        </div>

        <Link to="/admin/comm/email/create">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <Plus size={16} />
            Create Template
          </button>
        </Link>
      </div>

      {/* ================= TEMPLATE CARDS ================= */}
{templates.length === 0 ? (
  <div className="text-center text-gray-500 py-20">
    No email templates created yet
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {templates.map((tpl) => (
      <div
        key={tpl._id}
        className="bg-white border rounded-xl overflow-hidden hover:shadow-sm transition flex flex-col"
        style={{ height: 420 }} // fixed card height
      >
        {/* ===== 70% EMAIL PREVIEW ===== */}
        <div className="relative h-[70%] bg-gray-50 border-b">
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              title={`preview-${tpl._id}`}
              srcDoc={tpl.htmlBody}
              className="w-[140%] h-[140%] origin-top-left"
              style={{
                transform: "scale(0.7)",
                pointerEvents: "none", // 🔥 prevent clicks
                border: "none",
              }}
            />
          </div>

          {/* Overlay actions */}
          <div className="absolute top-2 right-2 flex gap-1 bg-white/90 rounded-md shadow px-1 py-1">
            <button
              onClick={() => setPreviewTemplate(tpl)}
              className="p-1 hover:text-orange-600"
              title="Preview"
            >
              <Eye size={14} />
            </button>

            <button
              onClick={() => navigate(`/admin/comm/email/edit/${tpl._id}`)}
              className="p-1 hover:text-blue-600"
              title="Edit"
            >
              <Edit size={14} />
            </button>
          </div>
        </div>

        {/* ===== 30% DETAILS ===== */}
        <div className="h-[30%] p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 truncate">
              {tpl.name}
            </h3>

            <p className="text-sm text-gray-500 truncate mt-1">
              {tpl.subject}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[tpl.status]}`}
            >
              {tpl.status}
            </span>

            <button
              onClick={() => deleteTemplate(tpl._id)}
              className="p-2 border rounded-md hover:bg-gray-50 text-red-600"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      {/* ================= FULL PREVIEW MODAL ================= */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[90%] max-w-4xl h-[85%] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h2 className="font-semibold">
                  {previewTemplate.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Subject: {previewTemplate.subject}
                </p>
              </div>

              <button onClick={() => setPreviewTemplate(null)}>
                <X size={18} />
              </button>
            </div>

            <iframe
              title="Email Preview"
              className="flex-1 w-full"
              srcDoc={previewTemplate.htmlBody}
            />
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500">
        Total templates: {templates.length}
      </div>
    </div>
  );
}
