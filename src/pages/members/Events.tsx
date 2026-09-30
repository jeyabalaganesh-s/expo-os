// src/pages/members/Events.tsx
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "How I Built My Food Brand",
    date: "31 Jan 2026",
    time: "6:00 PM",
    type: "Webinar",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Food Branding AMA Session",
    date: "5 Feb 2026",
    time: "7:00 PM",
    type: "Live Session",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Scaling FMCG Distribution",
    date: "10 Jan 2026",
    time: "6:00 PM",
    type: "Webinar",
    status: "past",
  },
];

export default function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filtered = events.filter((e) => e.status === tab);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Events
        </h2>
        <p className="text-gray-500 mt-1">
          Exclusive sessions for SUKA Circle members
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-3">
        <Tab
          active={tab === "upcoming"}
          label="Upcoming"
          onClick={() => setTab("upcoming")}
        />
        <Tab
          active={tab === "past"}
          label="Past"
          onClick={() => setTab("past")}
        />
      </div>

      {/* ================= EVENTS ================= */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function EventCard({ event }: { event: any }) {
  return (
    <div className="bg-white rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-600 mb-3">
          {event.type}
        </span>

        <h3 className="text-lg font-semibold text-gray-800">
          {event.title}
        </h3>

        <div className="mt-3 space-y-1 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <Calendar size={14} /> {event.date}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={14} /> {event.time}
          </p>
        </div>
      </div>

      <button className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700">
        {event.status === "upcoming" ? "Join Event" : "View Details"}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${
        active
          ? "bg-orange-600 text-white"
          : "bg-white text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl p-10 text-center text-gray-500">
      No events found.
    </div>
  );
}

