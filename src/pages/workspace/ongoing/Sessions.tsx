import { useEffect, useState } from "react";
import {
  Clock,
  Mic,
  PlayCircle,
  CheckCircle,
} from "lucide-react";

/* ================= TYPES ================= */

type SessionStatus = "upcoming" | "live" | "completed";

type Session = {
  id: string;
  title: string;
  speaker: string;
  startTime: string;
  endTime: string;
  description: string;
  status: SessionStatus;
};

/* ================= MOCK DATA ================= */

const INITIAL_SESSIONS: Session[] = [
  {
    id: "s1",
    title: "How to Build a Food Brand",
    speaker: "Arun Kumar",
    startTime: "10:00 AM",
    endTime: "10:45 AM",
    description: "Foundations of building a scalable food brand",
    status: "upcoming",
  },
  {
    id: "s2",
    title: "Packaging & Compliance",
    speaker: "Meena Raj",
    startTime: "11:00 AM",
    endTime: "11:30 AM",
    description: "Legal and packaging requirements for food startups",
    status: "upcoming",
  },
];

/* ================= COMPONENT ================= */

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_sessions");
    setSessions(saved ? JSON.parse(saved) : INITIAL_SESSIONS);
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem(
      "event_sessions",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  /* ================= ACTIONS ================= */

  const setStatus = (id: string, status: SessionStatus) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status } : s
      )
    );
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Event Sessions
        </h1>
        <p className="text-sm text-gray-500">
          View and manage event sessions
        </p>
      </div>

      {/* SESSION LIST */}
      <div className="space-y-4">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white border rounded-xl p-4 space-y-3"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="text-lg font-medium text-gray-900">
                  {s.title}
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Mic size={14} />
                    {s.speaker}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {s.startTime} – {s.endTime}
                  </span>
                </div>
              </div>

              {/* STATUS BADGE */}
              <StatusBadge status={s.status} />
            </div>

            <p className="text-sm text-gray-600">
              {s.description}
            </p>

            {/* ACTIONS (FRONTEND ONLY) */}
            <div className="flex gap-2 pt-2">
              {s.status !== "live" && (
                <button
                  onClick={() =>
                    setStatus(s.id, "live")
                  }
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md text-xs hover:bg-green-700"
                >
                  <PlayCircle size={14} />
                  Mark Live
                </button>
              )}

              {s.status !== "completed" && (
                <button
                  onClick={() =>
                    setStatus(s.id, "completed")
                  }
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 text-white rounded-md text-xs hover:bg-gray-700"
                >
                  <CheckCircle size={14} />
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({
  status,
}: {
  status: SessionStatus;
}) {
  const map = {
    upcoming: "bg-blue-100 text-blue-700",
    live: "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${map[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
