import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import { Plus, Edit, Trash2, Clock, Mic, X } from "lucide-react";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type SessionType =
  | "Keynote"
  | "Talk"
  | "Panel"
  | "Workshop"
  | "Break";

type AgendaItem = {
  _id: string;
  title: string;
  speaker?: string;
  startTime: string;
  endTime: string;
  type: SessionType;
};

/* ================= COMPONENT ================= */

export default function Agenda() {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<AgendaItem | null>(null);
  const [form, setForm] = useState<Partial<AgendaItem>>({});

  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= LOAD ================= */

  useEffect(() => {
    const loadAgenda = async () => {
      try {
        const res = await api.get(`/agenda/${slug}`);
        setAgenda(res.data);
      } finally {
        setLoading(false);
      }
    };

    loadAgenda();
  }, [slug]);

  /* ================= ACTIONS ================= */

  const addSession = async () => {
    const res = await api.post("/agenda", {
      slug,
      title: "New Session",
      startTime: "00:00",
      endTime: "00:00",
      type: "Talk",
    });

    setAgenda((prev) => [...prev, res.data]);
  };

  const removeSession = async (id: string) => {
    if (!confirm("Delete this session?")) return;

    await api.delete(`/agenda/${id}`);
    setAgenda((prev) => prev.filter((s) => s._id !== id));
  };

  const openEdit = (session: AgendaItem) => {
    setEditing(session);
    setForm(session);
  };

  const saveEdit = async () => {
    if (!editing) return;

    const res = await api.put(`/agenda/${editing._id}`, form);

    setAgenda((prev) =>
      prev.map((s) => (s._id === editing._id ? res.data : s))
    );

    setEditing(null);
    setForm({});
  };

  /* ================= UI ================= */

  return (
    <PageShell
      title="Agenda & Schedule"
      description="Plan sessions, speakers, and time slots for the event"
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={addSession}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700"
        >
          <Plus size={14} />
          Add Session
        </button>
      </div>

      {loading && <div className="text-sm text-gray-500">Loading agenda…</div>}

      <div className="space-y-3">
        {agenda.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 flex justify-between hover:bg-gray-50"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{item.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
                  {item.type}
                </span>
              </div>

              {item.speaker && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Mic size={14} />
                  {item.speaker}
                </div>
              )}

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} />
                {item.startTime} – {item.endTime}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEdit(item)}
                className="p-2 hover:bg-gray-100 text-blue-600"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() => removeSession(item._id)}
                className="p-2 hover:bg-gray-100 text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {!loading && agenda.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-6">
            No sessions added yet
          </div>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Edit Session</h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Title"
              value={form.title || ""}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Speaker"
              value={form.speaker || ""}
              onChange={(e) =>
                setForm({ ...form, speaker: e.target.value })
              }
            />

            <div className="flex gap-2">
              <input
                type="time"
                className="w-full border rounded px-3 py-2 text-sm"
                value={form.startTime || ""}
                onChange={(e) =>
                  setForm({ ...form, startTime: e.target.value })
                }
              />
              <input
                type="time"
                className="w-full border rounded px-3 py-2 text-sm"
                value={form.endTime || ""}
                onChange={(e) =>
                  setForm({ ...form, endTime: e.target.value })
                }
              />
            </div>

            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as SessionType })
              }
            >
              {["Keynote", "Talk", "Panel", "Workshop", "Break"].map(
                (t) => (
                  <option key={t}>{t}</option>
                )
              )}
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-sm border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 text-sm bg-orange-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
