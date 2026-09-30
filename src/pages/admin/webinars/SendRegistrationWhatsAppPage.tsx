import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";

export default function SendRegistrationWhatsAppPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const send = async () => {
    await api.post(`/admin/webinar-registrations/${id}/whatsapp`, {
      message,
    });
    alert("WhatsApp message sent");
    navigate(-1);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">Send WhatsApp</h1>

      <textarea
        className="border p-2 w-full"
        rows={6}
        placeholder="WhatsApp message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <button onClick={() => navigate(-1)} className="border px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={send} className="bg-green-600 text-white px-6 py-2 rounded">
          Send Message
        </button>
      </div>
    </div>
  );
}
