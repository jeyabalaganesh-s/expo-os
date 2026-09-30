import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { v4 as uuid } from "uuid";

type FieldType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "file";

type Field = {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  enabled: boolean;
  options?: string[];
};

type Section = {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
};

export default function CustomFieldsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];


  /* ================= LOAD ================= */

  useEffect(() => {
    api
      .get(`/events/registration-form/${slug}`)
      .then((res) => setSections(res.data.sections || []))
      .finally(() => setLoading(false));
  }, [slug]);

  /* ================= ACTIONS ================= */

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: uuid(),
        title: "New Section",
        fields: [],
      },
    ]);
  };

  const addField = (sectionIndex: number) => {
    const copy = [...sections];
    copy[sectionIndex].fields.push({
      key: uuid(),
      label: "New Field",
      type: "text",
      required: false,
      enabled: true,
    });
    setSections(copy);
  };

  const saveForm = async () => {
    setSaving(true);
    await api.put(`/events/registration-form/${slug}`, {
      sections,
    });
    setSaving(false);
    alert("Registration form saved");
  };

  if (loading) return <div>Loading...</div>;

  /* ================= UI ================= */

  return (
    <div className="flex gap-6">
      {/* ================= BUILDER ================= */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Registration Form – Custom Fields
          </h1>

          <button
            onClick={addSection}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            + Add Section
          </button>
        </div>

        {sections.map((section, sIdx) => (
          <div
            key={section.id}
            className="border rounded-lg p-4 bg-white"
          >
            {/* SECTION HEADER */}
            <div className="flex justify-between items-center mb-3">
              <input
                value={section.title}
                onChange={(e) => {
                  const copy = [...sections];
                  copy[sIdx].title = e.target.value;
                  setSections(copy);
                }}
                className="font-semibold text-lg outline-none"
              />

              <button
                onClick={() =>
                  setSections(sections.filter((_, i) => i !== sIdx))
                }
                className="text-red-500 text-sm"
              >
                Delete Section
              </button>
            </div>

            {/* FIELDS */}
            <div className="space-y-2">
              {section.fields.map((field, fIdx) => (
                <div
                  key={field.key}
                  className="flex items-center gap-3 border p-2 rounded"
                >
                  <input
                    value={field.label}
                    onChange={(e) => {
                      const copy = [...sections];
                      copy[sIdx].fields[fIdx].label = e.target.value;
                      setSections(copy);
                    }}
                    className="flex-1 border rounded px-2 py-1"
                  />

                  <select
                    value={field.type}
                    onChange={(e) => {
                      const copy = [...sections];
                      copy[sIdx].fields[fIdx].type =
                        e.target.value as FieldType;
                      setSections(copy);
                    }}
                    className="border rounded px-2 py-1"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="number">Number</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Select</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="date">Date</option>
                    <option value="file">File</option>
                  </select>

                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => {
                        const copy = [...sections];
                        copy[sIdx].fields[fIdx].required = e.target.checked;
                        setSections(copy);
                      }}
                    />
                    Required
                  </label>

                  <button
                    onClick={() => {
                      const copy = [...sections];
                      copy[sIdx].fields = copy[sIdx].fields.filter(
                        (_, i) => i !== fIdx
                      );
                      setSections(copy);
                    }}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ADD FIELD */}
            <button
              onClick={() => addField(sIdx)}
              className="mt-3 text-sm text-purple-600"
            >
              + Add Field
            </button>
          </div>
        ))}

        <button
          onClick={saveForm}
          disabled={saving}
          className="px-6 py-2 bg-green-600 text-white rounded"
        >
          {saving ? "Saving..." : "Save Form"}
        </button>
      </div>

      {/* ================= LIVE PREVIEW ================= */}
      <div className="w-[360px] border-l pl-4">
        <h3 className="font-semibold mb-3">Live Preview</h3>

        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            <p className="font-medium">{section.title}</p>

            {section.fields.map((f) => (
              <input
                key={f.key}
                disabled
                placeholder={f.label}
                className="w-full border rounded p-2 mt-2 bg-gray-50"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
