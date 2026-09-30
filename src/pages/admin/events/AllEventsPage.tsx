import {
  Eye,
  Edit,
  CalendarDays,
  MapPin,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { Link } from "react-router-dom";

/* ================= TYPES ================= */

type EventStatus = "draft" | "upcoming" | "completed" | "cancelled";
type EventType = "Expo" | "Webinar" | "Circle Meet";
type EventPhase = "pre-event" | "on-going" | "post-event";

type EventItem = {
  _id: string;
  slug: string;
  title: string;
  type: EventType;
  date: string;
  location: string;
  status: EventStatus;
  phase: EventPhase;
  isVisible?: boolean;
};



/* 🔧 LOCAL EVENT DOMAIN */
const EVENT_DOMAIN = "event.lvh.me:5174";

/* ================= COMPONENT ================= */

export default function AllEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  /* ================= FETCH ================= */

  const fetchEvents = async () => {
    try {
      const res = await api.get("event/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ================= ACTIONS ================= */

  const toggleVisibility = async (id: string) => {
    const prev = [...events];

    setEvents((list) =>
      list.map((e) =>
        e._id === id ? { ...e, isVisible: !e.isVisible } : e
      )
    );

    try {
      await api.patch(`/event/events/${id}/visibility`);
    } catch (err) {
      console.error("Visibility update failed", err);
      setEvents(prev); // rollback
    }
  };

  const updatePhase = async (
    id: string,
    newPhase: EventPhase
  ) => {
    const prev = [...events];
    setUpdatingId(id);

    // Optimistic update
    setEvents((list) =>
      list.map((e) =>
        e._id === id ? { ...e, phase: newPhase } : e
      )
    );

    try {
      await api.patch(`/event/events/${id}/phase`, {
        phase: newPhase,
      });
    } catch (err) {
      console.error("Phase update failed", err);
      alert("Failed to update phase");
      setEvents(prev); // rollback
    } finally {
      setUpdatingId(null);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            All Events
          </h1>
          <p className="text-sm text-gray-500">
            Manage expos, webinars, and meetups
          </p>
        </div>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700">
          + Create Event
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">
            Loading events...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Phase</th>
                <th className="p-3 text-left">Visibility</th>
                <th className="p-3 text-left">Workspace</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => {
                const eventUrl = `http://${event.slug}.${EVENT_DOMAIN}/workspace`;

                return (
                  <tr
                    key={event._id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-gray-500">
                        {event.slug}
                      </div>
                    </td>

                    <td className="p-3">{event.type}</td>

                    <td className="p-3 items-center gap-1">
                      <MapPin size={14} />
                      {event.location}
                    </td>

                    <td className="p-3 text-xs flex items-center gap-1">
                      <CalendarDays size={14} />
                      {event.date}
                    </td>

                    <td className="p-3">
                        {event.status}
                    </td>

                    {/* PHASE */} 
                    <td className="p-3">
                      <select
                        disabled={updatingId === event._id}
                        value={event.phase}
                        onChange={(e) =>
                          updatePhase(
                            event._id,
                            e.target.value as EventPhase
                          )
                        }
                        className="text-xs border rounded-md px-2 py-1 disabled:opacity-60"
                      >
                        <option value="pre-event">Pre-Event</option>
                        <option value="on-going">On-Going</option>
                        <option value="post-event">Post-Event</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => toggleVisibility(event._id)}
                      >
                        {event.isVisible ? (
                          <ToggleRight size={20} className="text-green-600" />
                        ) : (
                          <ToggleLeft size={20} className="text-gray-400" />
                        )}
                      </button>
                    </td>

                    <td className="p-3">
                      <a
                        href={eventUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 text-xs"
                      >
                        Open <ExternalLink size={12} />
                      </a>
                    </td>

                    <td className="p-3 text-right">
                      <div className="inline-flex gap-2">
                        <Eye size={16} className="cursor-pointer" />
                        <Link to={`/events/${event._id}/edit`}>
                          <Edit size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Total events: {events.length}
      </div>
    </div>
  );
}
