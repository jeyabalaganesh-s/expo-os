import { useEffect, useState } from "react";
import api from "../../utils/api";

/* ================= TYPES ================= */

type Props = {
  isOpen: boolean;
  recipients: string[];
  onClose: () => void;
  source?: string;
};

type SenderIdentity = {
  _id: string;
  type: "email" | "domain";
  value: string;
  status: "Active" | "Inactive" ;
};

/* ================= COMPONENT ================= */

export default function EmailCampaignModal({
  isOpen,
  recipients,
  onClose,
  source = "general",
}: Props) {
  const [templates, setTemplates] = useState<any[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");

  /* ✅ Sender Emails */
  const [senders, setSenders] = useState<SenderIdentity[]>([]);
  const [senderEmail, setSenderEmail] = useState("");

  const [sendType, setSendType] = useState<"now" | "schedule">("now");
  const [scheduleAt, setScheduleAt] = useState("");

  const [tags, setTags] = useState("");
  const [sending, setSending] = useState(false);

  /* ===== PREVIEW ===== */
  const [showPreview, setShowPreview] = useState(false);

  const selectedTemplate = templates.find(
    (t) => t._id === templateId
  );

  const previewHtml = selectedTemplate?.htmlBody || "";

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    setTags("");
    if (!isOpen) return;


    Promise.all([
      api.get("/email-templates"),
      api.get("/email-senders"),
    ])
      .then(([templatesRes, sendersRes]) => {
        setTemplates(templatesRes.data);

        // Only email-type senders
        const emailSenders = sendersRes.data.filter(
          (s: SenderIdentity) => s.type === "email"
        );

        setSenders(emailSenders);

        // Auto-select first verified sender
        const defaultSender = emailSenders.find(
          (s: SenderIdentity) => s.status === "Active"
        );

        if (defaultSender) {
          setSenderEmail(defaultSender.value);
        }
      })
      .catch(() => alert("Failed to load email data"));
  }, [isOpen]);

  /* Auto-fill subject from template */
  useEffect(() => {
    if (selectedTemplate?.subject) {
      setSubject(selectedTemplate.subject);
    }
  }, [selectedTemplate]);

  /* ================= SEND CAMPAIGN ================= */

  const sendCampaign = async () => {
    if (!campaignName || !templateId || sending) return;

    if (!senderEmail) {
      alert("Please select sender email");
      return;
    }

    if (sendType === "schedule" && !scheduleAt) {
      alert("Please select schedule date & time");
      return;
    }

    setSending(true);

    try {
      const payload = {
        name: campaignName,
        templateId,
        recipients,
        source,
        senderEmail,
        subject: subject || undefined,
        sendType,
        scheduleAt: sendType === "schedule" ? scheduleAt : null,
        tags: tags
          ? tags.split(",").map((t) => t.trim())
          : [],
      };

      const { data } = await api.post("/email-campaigns", payload);

      if (sendType === "now") {
        await api.post(`/email-campaigns/${data._id}/send`);
      }

      alert(
        sendType === "now"
          ? "Campaign sent successfully"
          : "Campaign scheduled successfully"
      );

      onClose();
    } catch {
      alert("Failed to start campaign");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  /* ================= UI ================= */

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
        <div className="bg-white rounded-xl w-[480px] p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Run Email Campaign
          </h2>

          {/* Campaign Name */}
          <div>
            <label className="text-sm font-medium">
              Campaign Name
            </label>
            <input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Sender Email Select */}
          <div>
            <label className="text-sm font-medium">
              Sender Email
            </label>
            <select
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Select sender</option>
              {senders.map((s) => (
                <option
                  key={s._id}
                  value={s.value}
                  disabled={s.status !== "Active"}
                >
                  {s.value}
                  {s.status !== "Active" && " (Inactive)"}
                </option>
              ))}
            </select>

            {senders.length === 0 && (
              <p className="text-xs text-red-500 mt-1">
                No sender emails added. Please add one in Sender Settings.
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium">
              Email Subject
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Template + Preview */}
          <div>
            <label className="text-sm font-medium">
              Email Template
            </label>

            <div className="flex gap-2">
              <select
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
              >
                <option value="">Select template</option>
                {templates.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>

              <button
                disabled={!templateId}
                onClick={() => setShowPreview(true)}
                className="px-3 py-2 border rounded text-sm disabled:opacity-50"
              >
                Preview
              </button>
            </div>
          </div>

          {/* Send Type */}
          <div>
            <label className="text-sm font-medium">
              Send Type
            </label>
            <div className="flex gap-4 mt-1 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={sendType === "now"}
                  onChange={() => setSendType("now")}
                />
                Send Now
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={sendType === "schedule"}
                  onChange={() => setSendType("schedule")}
                />
                Schedule
              </label>
            </div>
          </div>

          {sendType === "schedule" && (
            <input
              type="datetime-local"
              value={scheduleAt}
              onChange={(e) => setScheduleAt(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={sendCampaign}
              disabled={sending}
              className="px-4 py-1 bg-orange-600 text-white rounded disabled:opacity-50"
            >
              {sending ? "Processing…" : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white w-[900px] h-[85vh] rounded-xl flex flex-col">
            <div className="flex justify-between px-4 py-2 border-b">
              <h3 className="text-sm font-medium">
                Email Preview – {selectedTemplate?.name}
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-sm"
              >
                Close
              </button>
            </div>
            <iframe
              className="flex-1 border-none"
              srcDoc={previewHtml}
            />
          </div>
        </div>
      )}
    </>
  );
}
