import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import api from "../../../utils/api";
import { DEFAULT_LANDING_SECTIONS } from "../../../config/event/defaultLandingSections";

/* ================= TYPES ================= */

type LayoutType =
  | "center"
  | "image-left"
  | "image-right"
  | "two-column"
  | "steps"
  | "carousel";

type SectionStyle = {
  backgroundType?: "color" | "gradient" | "image";
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  padding?: string;
  layout?: LayoutType;
};

type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "button" | "steps" | "carousel";
};

type Section = {
  id: string;
  label: string;
  enabled: boolean;
  style?: SectionStyle;
  fields: Field[];
};

type Payload = {
  sections: Section[];
  data: Record<string, any>;
};

/* ================= COMPONENT ================= */

export default function Landing() {
  const [sections, setSections] = useState<Section[]>([]);
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const slug =
    window.location.href.split("/workspace")[0].split("//")[1].split(".")[0];

  /* ================= FETCH ================= */

  useEffect(() => {
    uploading && console.log("Uploading:", uploading);
    (async () => {
      const res = await api.get(`/events/${slug}/landing`);
      if (res.data?.sections) {
        setSections(res.data.sections);
        setData(res.data.data || {});
      } else {
        setSections(
          DEFAULT_LANDING_SECTIONS.map((s: any) => ({
            ...s,
            enabled: true,
            style: {
              backgroundType: "color",
              backgroundColor: "#ffffff",
              padding: "80px",
              layout: "center",
            },
          }))
        );
      }
      setLoading(false);
    })();
  }, [slug]);

  /* ================= SAVE ================= */

  const save = async () => {
    setSaving(true);
    await api.put(`/events/${slug}/landing`, {
      sections,
      data,
    } as Payload);
    setSaving(false);
  };

  /* ================= IMAGE UPLOAD ================= */

  const uploadImage = async (
    file: File,
    sectionId: string,
    fieldKey: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(fieldKey);

    try {
      const res = await api.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateValue(sectionId, fieldKey, res.data.url);
    } finally {
      setUploading(null);
    }
  };

  const uploadBackgroundImage = async (
    file: File,
    sectionId: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(sectionId);

    try {
      const res = await api.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateStyle(sectionId, "backgroundImage", res.data.url);
    } finally {
      setUploading(null);
    }
  };

  const deleteField = (sectionId: string, fieldKey: string) => {
  // Remove field from section
  setSections((prev) =>
    prev.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.filter(
              (f) => f.key !== fieldKey
            ),
          }
        : section
    )
  );

  // Remove value from data
  setData((prev) => {
    const sectionData = { ...(prev[sectionId] || {}) };
    delete sectionData[fieldKey];

    return {
      ...prev,
      [sectionId]: sectionData,
    };
  });
};


  /* ================= HELPERS ================= */

  const addSection = () => {
    const id = `section_${Date.now()}`;
    setSections((p) => [
      ...p,
      {
        id,
        label: "New Section",
        enabled: true,
        style: {
          backgroundType: "color",
          backgroundColor: "#ffffff",
          padding: "80px",
          layout: "center",
        },
        fields: [],
      },
    ]);
    setData((p) => ({ ...p, [id]: {} }));
  };

  const updateSection = (id: string, updates: Partial<Section>) => {
    setSections((p) =>
      p.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const updateStyle = (
    id: string,
    key: keyof SectionStyle,
    value: any
  ) => {
    setSections((p) =>
      p.map((s) =>
        s.id === id
          ? { ...s, style: { ...(s.style || {}), [key]: value } }
          : s
      )
    );
  };

  const deleteSection = (id: string) => {
    setSections((p) => p.filter((s) => s.id !== id));
    setData((p) => {
      const d = { ...p };
      delete d[id];
      return d;
    });
  };

  const addField = (sectionId: string, type: Field["type"]) => {
    setSections((p) =>
      p.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              fields: [
                ...s.fields,
                {
                  key: `field_${Date.now()}`,
                  label: "New Field",
                  type,
                },
              ],
            }
          : s
      )
    );
  };

  const updateValue = (
    sectionId: string,
    fieldKey: string,
    value: any
  ) => {
    setData((p) => ({
      ...p,
      [sectionId]: { ...(p[sectionId] || {}), [fieldKey]: value },
    }));
  };

  /* ================= FIELD RENDER ================= */

  const renderField = (
    sectionId: string,
    field: Field,
    value: any
  ) => {
    if (preview) {
      return <pre className="text-sm">{JSON.stringify(value, null, 2)}</pre>;
    }

    if (field.type === "image") {
      return (
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file, sectionId, field.key);
            }}
          />
          {value && (
            <img src={value} className="max-h-40 rounded border" />
          )}
        </div>
      );
    }

    if (field.type === "button") {
      return (
        <div className="space-y-2">
          <input
            className="border px-2 py-1 w-full"
            placeholder="Label"
            value={value?.label || ""}
            onChange={(e) =>
              updateValue(sectionId, field.key, {
                ...value,
                label: e.target.value,
              })
            }
          />
          <input
            className="border px-2 py-1 w-full"
            placeholder="URL"
            value={value?.url || ""}
            onChange={(e) =>
              updateValue(sectionId, field.key, {
                ...value,
                url: e.target.value,
              })
            }
          />
        </div>
      );
    }

    if (field.type === "steps") {
      return (
        <textarea
          className="border px-2 py-1 w-full"
          rows={4}
          value={(value || []).join("\n")}
          onChange={(e) =>
            updateValue(sectionId, field.key, e.target.value.split("\n"))
          }
        />
      );
    }

    return (
      <input
        className="border px-2 py-1 w-full"
        value={value || ""}
        onChange={(e) =>
          updateValue(sectionId, field.key, e.target.value)
        }
      />
    );
  };

  /* ================= UI ================= */

  return (
    <PageShell
      title="Landing Page Builder"
      actions={[
        {
          label: preview ? "Edit Mode" : "Preview Mode",
          onClick: () => setPreview(!preview),
        },
        { label: "+ Add Section", onClick: addSection, variant: "primary" },
      ]}
    >
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="space-y-10">
          {sections.map((section) => {
            const style = section.style || {};
            const bg =
              style.backgroundType === "gradient"
                ? `linear-gradient(${style.gradientFrom}, ${style.gradientTo})`
                : style.backgroundType === "image"
                ? `url(${style.backgroundImage})`
                : style.backgroundColor;

            return (
              <div
                key={section.id}
                className="border rounded-lg"
                style={{ background: bg, padding: style.padding }}
              >
                <div className="bg-white/80 p-6 rounded space-y-4">
                  <input
                    className="text-xl font-bold w-full"
                    value={section.label}
                    onChange={(e) =>
                      updateSection(section.id, { label: e.target.value })
                    }
                  />

                  {/* SETTINGS */}
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={style.layout}
                      onChange={(e) =>
                        updateStyle(
                          section.id,
                          "layout",
                          e.target.value as LayoutType
                        )
                      }
                    >
                      <option value="center">Center</option>
                      <option value="image-left">Image Left</option>
                      <option value="image-right">Image Right</option>
                      <option value="two-column">Two Column</option>
                      <option value="steps">Steps</option>
                      <option value="carousel">Carousel</option>
                    </select>

                    <select
                      value={style.backgroundType}
                      onChange={(e) =>
                        updateStyle(section.id, "backgroundType", e.target.value)
                      }
                    >
                      <option value="color">Color</option>
                      <option value="gradient">Gradient</option>
                      <option value="image">Image</option>
                    </select>

                    {style.backgroundType === "color" && (
                      <input
                        type="color"
                        value={style.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          updateStyle(
                            section.id,
                            "backgroundColor",
                            e.target.value
                          )
                        }
                      />
                    )}

                    {style.backgroundType === "gradient" && (
                      <>
                        <input
                          type="color"
                          value={style.gradientFrom || "#000000"}
                          onChange={(e) =>
                            updateStyle(
                              section.id,
                              "gradientFrom",
                              e.target.value
                            )
                          }
                        />
                        <input
                          type="color"
                          value={style.gradientTo || "#ffffff"}
                          onChange={(e) =>
                            updateStyle(
                              section.id,
                              "gradientTo",
                              e.target.value
                            )
                          }
                        />
                      </>
                    )}

                    {style.backgroundType === "image" && (
                      <label className="col-span-2 cursor-pointer border px-3 py-2 rounded text-sm">
                        📷 Upload Background
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file)
                              uploadBackgroundImage(file, section.id);
                          }}
                        />
                        {style.backgroundImage && (
                          <img
                            src={style.backgroundImage}
                            className="mt-2 max-h-32 rounded"
                          />
                        )}
                      </label>
                    )}
                  </div>

                  {section.fields.map((field) => (
  <div
    key={field.key}
    className="border rounded-md p-3 space-y-2 bg-white"
  >
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">
        {field.label}
      </label>

      {!preview && (
        <button
          onClick={() =>
            deleteField(section.id, field.key)
          }
          className="text-xs text-red-500 hover:underline"
        >
          Delete
        </button>
      )}
    </div>

    {renderField(
      section.id,
      field,
      data?.[section.id]?.[field.key]
    )}
  </div>
))}


                  {!preview && (
                    <div className="flex gap-2">
                      {["text", "image", "button", "steps"].map((t) => (
                        <button
                          key={t}
                          onClick={() => addField(section.id, t as any)}
                          className="text-xs border px-2 py-1"
                        >
                          + {t}
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => deleteSection(section.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete Section
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end">
            <button
              onClick={save}
              className="bg-orange-600 text-white px-6 py-2 rounded"
            >
              {saving ? "Saving…" : "Save Landing"}
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
