import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";

/* ================= TYPES ================= */
type Speaker = { name: string; title: string; img: string };

type EnabledSection = {
  key: string;
  label: string;
};

/* ================= HELPERS ================= */
const asArray = <T,>(value: any): T[] =>
  Array.isArray(value) ? value : [];

const getDefaultSectionData = (key: string) => {
  switch (key) {
    case "agenda":
    case "highlights":
      return [];
    case "speakers":
      return [];
    case "basic":
      return { description: "" };
    default:
      return { content: "" };
  }
};

/* ================= COMPONENT ================= */
export default function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  /* ================= CORE ================= */
  const [title, setTitle] = useState("");
  const [type, setType] = useState("webinar");
  const [status, setStatus] = useState("draft");

  /* ================= SECTION CONTROL ================= */
  const [enabledSections, setEnabledSections] = useState<EnabledSection[]>([
    { key: "basic", label: "Basic Info" },
  ]);

  const [sectionsData, setSectionsData] = useState<Record<string, any>>({});

  /* ================= MODAL ================= */
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.url;
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/event/admin/events/${id}`);

        setTitle(data.title || "");
        setType(data.type || "webinar");
        setStatus(data.status || "draft");
        setEnabledSections(
          data.enabledSections?.length
            ? data.enabledSections
            : [{ key: "basic", label: "Basic Info" }]
        );
        setSectionsData(data.sectionsData || {});
      } catch {
        alert("Event not found");
        navigate("/events/all");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  /* ================= UTILS ================= */
  const updateSectionData = (key: string, value: any) => {
    setSectionsData((prev) => ({ ...prev, [key]: value }));
  };

  /* ================= DRAG & DROP ================= */
  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const onDrop = (e: React.DragEvent, dropIndex: number) => {
    const dragIndex = Number(e.dataTransfer.getData("index"));
    if (dragIndex === dropIndex) return;

    const updated = [...enabledSections];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, moved);
    setEnabledSections(updated);
  };

  /* ================= SAVE ================= */
  const submit = async () => {
    const payload = {
      title,
      type,
      status,
      enabledSections,
      sectionsData,
    };

    try {
      await api.put(`/event/admin/events/${id}`, payload);
      alert("Event updated successfully");
      navigate("/events/all");
    } catch {
      alert("Failed to update event");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  /* ================= RENDER ================= */
  return (
    <div className="flex gap-6 max-w-7xl mx-auto">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 sticky top-20 bg-white border rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-semibold text-gray-500">SECTIONS</h3>

        {enabledSections.map((s, index) => (
          <div
            key={s.key}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, index)}
            className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1 cursor-move"
          >
            <button
              onClick={() =>
                document.getElementById(s.key)?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="flex-1 text-left text-sm px-2 py-1 hover:bg-orange-50 rounded"
            >
              {s.label}
            </button>
            <button
              onClick={() =>
                setEnabledSections(enabledSections.filter((_, i) => i !== index))
              }
              className="text-xs text-red-500"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={() => setShowAddSectionModal(true)}
          className="w-full mt-2 text-sm border border-dashed py-2 rounded hover:bg-gray-50"
        >
          + Add Section
        </button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 space-y-6">

        {enabledSections.map((section) => {
          const data =
            sectionsData[section.key] ??
            getDefaultSectionData(section.key);

          /* ===== BASIC ===== */
          if (section.key === "basic") {
            return (
              <section
                key="basic"
                id="basic"
                className="bg-white border rounded-xl p-6 space-y-4"
              >
                <h2 className="font-semibold">Basic Information</h2>

                <input
                  className="border p-2 w-full"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  className="border p-2 w-full"
                  placeholder="Description"
                  value={data.description || ""}
                  onChange={(e) =>
                    updateSectionData("basic", {
                      ...data,
                      description: e.target.value,
                    })
                  }
                />
              </section>
            );
          }

          /* ===== AGENDA ===== */
          if (section.key === "agenda") {
            const agendaItems = asArray<string>(data);

            return (
              <section
                key="agenda"
                id="agenda"
                className="bg-white border rounded-xl p-6"
              >
                <h2 className="font-semibold mb-2">Agenda</h2>

                {agendaItems.map((v, i) => (
                  <input
                    key={i}
                    className="border p-2 w-full mb-2"
                    value={v}
                    onChange={(e) => {
                      const updated = [...agendaItems];
                      updated[i] = e.target.value;
                      updateSectionData("agenda", updated);
                    }}
                  />
                ))}

                <button
                  className="text-sm text-orange-600"
                  onClick={() =>
                    updateSectionData("agenda", [...agendaItems, ""])
                  }
                >
                  + Add agenda
                </button>
              </section>
            );
          }

          /* ===== SPEAKERS (WITH IMAGE UPLOAD) ===== */
          if (section.key === "speakers") {
            const speakerItems = asArray<Speaker>(data);

            return (
              <section
                key="speakers"
                id="speakers"
                className="bg-white border rounded-xl p-6"
              >
                <h2 className="font-semibold mb-4">Speakers</h2>

                {speakerItems.map((s, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center mb-3"
                  >
                    <input
                      className="border p-2"
                      placeholder="Name"
                      value={s.name}
                      onChange={(e) => {
                        const updated = [...speakerItems];
                        updated[i] = { ...s, name: e.target.value };
                        updateSectionData("speakers", updated);
                      }}
                    />

                    <input
                      className="border p-2"
                      placeholder="Title"
                      value={s.title}
                      onChange={(e) => {
                        const updated = [...speakerItems];
                        updated[i] = { ...s, title: e.target.value };
                        updateSectionData("speakers", updated);
                      }}
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (!e.target.files?.[0]) return;
                        const url = await uploadImage(e.target.files[0]);
                        const updated = [...speakerItems];
                        updated[i] = { ...s, img: url };
                        updateSectionData("speakers", updated);
                      }}
                    />

                    {s.img && (
                      <img
                        src={s.img}
                        alt="speaker"
                        className="w-14 h-14 rounded-full object-cover border"
                      />
                    )}

                    <button
                      onClick={() =>
                        updateSectionData(
                          "speakers",
                          speakerItems.filter((_, idx) => idx !== i)
                        )
                      }
                      className="text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  className="text-sm text-orange-600"
                  onClick={() =>
                    updateSectionData("speakers", [
                      ...speakerItems,
                      { name: "", title: "", img: "" },
                    ])
                  }
                >
                  + Add speaker
                </button>
              </section>
            );
          }

          /* ===== CUSTOM ===== */
          return (
            <section
              key={section.key}
              id={section.key}
              className="bg-white border rounded-xl p-6"
            >
              <h2 className="font-semibold">{section.label}</h2>
              <textarea
                className="border p-2 w-full mt-2"
                placeholder="Section content"
                value={data.content || ""}
                onChange={(e) =>
                  updateSectionData(section.key, {
                    content: e.target.value,
                  })
                }
              />
            </section>
          );
        })}

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/events/all")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-orange-600 text-white px-6 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </main>

      {/* ===== ADD SECTION MODAL ===== */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 space-y-4">
            <h2 className="text-lg font-semibold">Add Section</h2>

            <input
              className="border p-2 w-full"
              placeholder="Section name (eg: Sponsors)"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!newSectionName.trim()) return;

                  const key = newSectionName
                    .toLowerCase()
                    .replace(/\s+/g, "_");

                  setEnabledSections([
                    ...enabledSections,
                    { key, label: newSectionName },
                  ]);

                  setSectionsData((prev) => ({
                    ...prev,
                    [key]: getDefaultSectionData(key),
                  }));

                  setNewSectionName("");
                  setShowAddSectionModal(false);
                }}
                className="bg-orange-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
