import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";

export default function SendRegistrationEmailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const send = async () => {
    await api.post(`/admin/webinar-registrations/${id}/email`, {
      subject,
      message,
    });
    alert("Email sent");
    navigate(-1);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">Send Email</h1>

      <input
        className="border p-2 w-full"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        rows={6}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <button onClick={() => navigate(-1)} className="border px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={send} className="bg-blue-600 text-white px-6 py-2 rounded">
          Send Email
        </button>
      </div>
    </div>
  );
}
