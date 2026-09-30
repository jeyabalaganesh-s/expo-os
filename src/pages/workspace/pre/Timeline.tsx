import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import api from "../../../utils/api";
import {
  Calendar,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
} from "lucide-react";

/* ================= TYPES ================= */

type TimelineStatus = "Pending" | "Completed";

type TimelineItem = {
  _id: string;
  title: string;
  description?: string;
  date: string;
  status: TimelineStatus;
  system?: boolean;
};

/* ================= COMPONENT ================= */

export default function Timeline() {
  // TEMP – later from Event Context
  const eventPhase: "PRE" | "ONGOING" | "POST" = "PRE";

  const [items, setItems] = useState<TimelineItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= SLUG ================= */

  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchTimeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTimeline = async () => {
    try {
      const res = await api.get(
        `/events/${slug}/timeline`
      );
      setItems(res.data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIONS ================= */

  const addItem = async () => {
    if (!newTitle || !newDate) return;

    const res = await api.post(
      `/events/${slug}/timeline`,
      {
        title: newTitle,
        date: newDate,
      }
    );

    setItems((prev) => [...prev, res.data]);
    setNewTitle("");
    setNewDate("");
  };

  const toggleStatus = async (id: string) => {
    const res = await api.patch(
      `/events/${slug}/timeline/${id}`
    );

    setItems((prev) =>
      prev.map((i) =>
        i._id === id ? res.data : i
      )
    );
  };

  const removeItem = async (id: string) => {
    if (!confirm("Delete this timeline item?")) return;

    await api.delete(
      `/events/${slug}/timeline/${id}`
    );

    setItems((prev) =>
      prev.filter((i) => i._id !== id)
    );
  };

  /* ================= UI ================= */

  return (
    <PageShell
      title="Event Timeline"
      description="Track important milestones from setup to completion"
    >
      {loading ? (
        <div className="text-sm text-gray-500">
          Loading timeline…
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl">
          {/* ================= ADD ITEM ================= */}
          {eventPhase !== "PRE" && (
            <section className="bg-white border rounded-xl p-4 space-y-3">
              <h2 className="font-medium text-sm">
                Add Timeline Item
              </h2>

              <div className="flex gap-3">
                <input
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(e.target.value)
                  }
                  placeholder="Milestone title"
                  className="flex-1 border rounded px-3 py-2 text-sm"
                />

                <input
                  type="date"
                  value={newDate}
                  onChange={(e) =>
                    setNewDate(e.target.value)
                  }
                  className="border rounded px-3 py-2 text-sm"
                />

                <button
                  onClick={addItem}
                  className="bg-orange-600 text-white px-4 py-2 rounded text-sm flex items-center gap-1"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
            </section>
          )}

          {/* ================= TIMELINE ================= */}
          <section className="bg-white border rounded-xl p-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 items-start"
                >
                  {/* STATUS ICON */}
                  <div className="pt-1">
                    {item.status === "Completed" ? (
                      <CheckCircle
                        className="text-green-600"
                        size={18}
                      />
                    ) : (
                      <Clock
                        className="text-gray-400"
                        size={18}
                      />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-xs text-gray-500">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <Calendar size={12} />
                          {item.date}
                          {item.system && (
                            <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded text-[10px]">
                              SYSTEM
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ACTIONS */}
                      {!item.system &&
                        eventPhase !== "PRE" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                toggleStatus(item._id)
                              }
                              className="text-xs text-blue-600"
                            >
                              {item.status ===
                              "Pending"
                                ? "Mark done"
                                : "Undo"}
                            </button>

                            <button
                              onClick={() =>
                                removeItem(item._id)
                              }
                              className="text-red-600"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-6">
                  No timeline items yet
                </div>
              )}
            </div>
          </section>

          {/* ================= POST EVENT NOTICE ================= */}
          {eventPhase === "PRE" && (
            <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-500">
              Timeline is locked after the event
              for record and reporting purposes.
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}
