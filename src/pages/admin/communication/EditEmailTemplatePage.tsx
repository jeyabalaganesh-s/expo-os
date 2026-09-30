import { ArrowLeft, Save, Eye, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

type TemplateStatus = "Draft" | "Approved" | "Disabled";
type TemplateCategory =
  | "Membership"
  | "Events"
  | "Webinars"
  | "Payments"
  | "System";

/* ================= HTML CLEANER ================= */
const normalizeHtml = (html: string) => {
  if (html.includes('\\"') || html.includes("\\n")) {
    try {
      return html
        .replace(/\\"/g, '"')
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "")
        .trim();
    } catch {
      return html;
    }
  }
  return html;
};

export default function EditEmailTemplatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    category: "Membership" as TemplateCategory,
    status: "Draft" as TemplateStatus,
    htmlBody: "",
  });

  /* ================= FETCH TEMPLATE ================= */
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const { data } = await api.get(`/email-templates/${id}`);

        setForm({
          name: data.name || "",
          subject: data.subject || "",
          category: data.category || "Membership",
          status: data.status || "Draft",
          htmlBody: normalizeHtml(data.htmlBody || ""),
        });
      } catch {
        alert("Failed to load template");
        navigate("/admin/comm/email");
      } finally {
        setFetching(false);
      }
    };

    fetchTemplate();
  }, [id, navigate]);

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedHtml = normalizeHtml(form.htmlBody);

    if (!form.name || !form.subject || !cleanedHtml) {
      alert("Name, subject and HTML content are required");
      return;
    }

    try {
      setLoading(true);

      await api.put(`/email-templates/${id}`, {
        ...form,
        htmlBody: cleanedHtml,
      });

      navigate("/admin/comm/email");
    } catch {
      alert("Failed to update template");
    } finally {
      setLoading(false);
    }
  };

  const previewHtml = normalizeHtml(form.htmlBody);

  if (fetching) {
    return <p className="text-sm text-gray-500">Loading template...</p>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/comm/email"
          className="p-2 border rounded-md hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
        </Link>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Email Template
          </h1>
          <p className="text-sm text-gray-500">
            Update HTML email template
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Template Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Subject
          </label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Category + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>Membership</option>
              <option>Events</option>
              <option>Webinars</option>
              <option>Payments</option>
              <option>System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>Draft</option>
              <option>Approved</option>
              <option>Disabled</option>
            </select>
          </div>
        </div>

        {/* HTML Editor */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email HTML Content
          </label>
          <textarea
            name="htmlBody"
            value={form.htmlBody}
            onChange={handleChange}
            rows={12}
            className="w-full font-mono border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="text-sm flex items-center gap-2 text-blue-600"
          >
            <Eye size={16} />
            Preview Email
          </button>

          <div className="flex gap-3">
            <Link
              to="/admin/comm/email"
              className="px-4 py-2 text-sm border rounded-md"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <Save size={16} />
              {loading ? "Updating..." : "Update Template"}
            </button>
          </div>
        </div>
      </form>

      {/* ================= PREVIEW MODAL ================= */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-3xl h-[80%] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Email Preview</h3>
              <button onClick={() => setShowPreview(false)}>
                <X size={18} />
              </button>
            </div>

            <iframe
              title="Email Preview"
              className="flex-1 w-full"
              srcDoc={previewHtml}
            />
          </div>
        </div>
      )}
    </div>
  );
}
