import { useEffect, useState } from "react";
import { Eye, Send, Users } from "lucide-react";

/* ================= TYPES ================= */

type Audience =
  | "all"
  | "attended"
  | "not_attended";

type FollowUp = {
  id: string;
  subject: string;
  body: string;
  audience: Audience;
  sentAt: string;
};

/* ================= COMPONENT ================= */

export default function WorkspaceFollowUpEmail() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] =
    useState<Audience>("all");
  const [history, setHistory] = useState<FollowUp[]>(
    []
  );
  const [preview, setPreview] = useState(false);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem(
      "event_followups"
    );
    setHistory(saved ? JSON.parse(saved) : []);
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem(
      "event_followups",
      JSON.stringify(history)
    );
  }, [history]);

  /* ================= ACTIONS ================= */

  const sendEmail = () => {
    if (!subject.trim() || !body.trim()) return;

    const email: FollowUp = {
      id: Date.now().toString(),
      subject,
      body,
      audience,
      sentAt: new Date().toISOString(),
    };

    setHistory((prev) => [email, ...prev]);
    setSubject("");
    setBody("");
    setAudience("all");
    setPreview(false);
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Follow-up Emails
        </h1>
        <p className="text-sm text-gray-500">
          Send post-event emails to engage attendees
        </p>
      </div>

      {/* COMPOSER */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            placeholder="Email subject"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <select
            value={audience}
            onChange={(e) =>
              setAudience(
                e.target.value as Audience
              )
            }
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">
              All Participants
            </option>
            <option value="attended">
              Attended Only
            </option>
            <option value="not_attended">
              Not Attended
            </option>
          </select>
        </div>

        <textarea
          value={body}
          onChange={(e) =>
            setBody(e.target.value)
          }
          placeholder="Write your follow-up message here..."
          rows={5}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setPreview(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
          >
            <Eye size={16} />
            Preview
          </button>

          <button
            onClick={sendEmail}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
          >
            <Send size={16} />
            Send Email
          </button>
        </div>
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="bg-gray-50 border rounded-xl p-4 space-y-2">
          <div className="text-xs text-gray-400">
            Email Preview
          </div>
          <div className="font-medium">
            {subject}
          </div>
          <div className="text-sm whitespace-pre-line">
            {body}
          </div>
        </div>
      )}

      {/* HISTORY */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">
                Subject
              </th>
              <th className="p-3 text-left">
                Audience
              </th>
              <th className="p-3 text-right">
                Sent At
              </th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-4 text-center text-gray-400"
                >
                  No follow-up emails sent yet
                </td>
              </tr>
            ) : (
              history.map((h) => (
                <tr
                  key={h.id}
                  className="border-b last:border-0"
                >
                  <td className="p-3 font-medium">
                    {h.subject}
                  </td>
                  <td className="p-3 flex items-center gap-1 capitalize">
                    <Users size={14} />
                    {h.audience.replace("_", " ")}
                  </td>
                  <td className="p-3 text-right text-xs text-gray-500">
                    {new Date(
                      h.sentAt
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
