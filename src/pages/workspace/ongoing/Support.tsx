import { useEffect, useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

/* ================= TYPES ================= */

type SupportStatus = "open" | "resolved";

type SupportTicket = {
  id: string;
  name: string;
  category: string;
  message: string;
  status: SupportStatus;
  createdAt: string;
};

/* ================= COMPONENT ================= */

export default function SupportPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Technical");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_support");
    setTickets(saved ? JSON.parse(saved) : []);
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem(
      "event_support",
      JSON.stringify(tickets)
    );
  }, [tickets]);

  /* ================= ACTIONS ================= */

  const submitTicket = () => {
    if (!name.trim() || !message.trim()) return;

    const ticket: SupportTicket = {
      id: Date.now().toString(),
      name,
      category,
      message,
      status: "open",
      createdAt: new Date().toISOString(),
    };

    setTickets((prev) => [ticket, ...prev]);
    setMessage("");
  };

  const markResolved = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "resolved" } : t
      )
    );
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Support
        </h1>
        <p className="text-sm text-gray-500">
          Need help? Raise a support request
        </p>
      </div>

      {/* CREATE TICKET */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option>Technical</option>
            <option>Payment</option>
            <option>Entry / Check-In</option>
            <option>Session</option>
            <option>Other</option>
          </select>
        </div>

        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Describe your issue..."
          className="w-full border rounded-md px-3 py-2 text-sm resize-none"
          rows={3}
        />

        <button
          onClick={submitTicket}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          <Send size={16} />
          Submit Request
        </button>
      </div>

      {/* TICKETS */}
      <div className="space-y-3">
        {tickets.length === 0 ? (
          <div className="text-sm text-gray-400">
            No support requests yet
          </div>
        ) : (
          tickets.map((t) => (
            <div
              key={t.id}
              className="bg-white border rounded-xl p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-900">
                    {t.category}
                  </div>
                  <div className="text-xs text-gray-400">
                    Raised by {t.name} •{" "}
                    {new Date(
                      t.createdAt
                    ).toLocaleTimeString()}
                  </div>
                </div>

                <StatusBadge status={t.status} />
              </div>

              <p className="text-sm text-gray-600">
                {t.message}
              </p>

              {t.status === "open" && (
                <button
                  onClick={() => markResolved(t.id)}
                  className="text-xs text-green-600 hover:underline"
                >
                  Mark as resolved
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({
  status,
}: {
  status: SupportStatus;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        status === "open"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {status === "open" ? (
        <AlertCircle size={12} />
      ) : (
        <CheckCircle size={12} />
      )}
      {status.toUpperCase()}
    </span>
  );
}
