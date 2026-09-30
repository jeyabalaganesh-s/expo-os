// src/pages/events/CreateEventPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

type EventType = "Expo" | "Webinar" | "Meetup";
type Visibility = "Public" | "Members Only";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "Expo" as EventType,
    description: "",
    city: "",
    venue: "",
    startDate: "",
    visibility: "Public" as Visibility,
    maxCapacity: "",
    status: "Draft",
  });

  const update = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= HELPERS ================= */
  const createSlug = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  const normalizeType = (type: EventType) => {
    if (type === "Meetup") return "meetup";
    if (type === "Webinar") return "webinar";
    return "expo";
  };

  const getDefaultSections = (type: EventType) => {
    switch (type) {
      case "Webinar":
        return [
          { key: "basic", label: "Basic Info" },
          { key: "agenda", label: "Agenda" },
          { key: "speakers", label: "Speakers" },
          { key: "cta", label: "CTA" },
        ];
      case "Meetup":
        return [
          { key: "basic", label: "Basic Info" },
          { key: "agenda", label: "Agenda" },
          { key: "cta", label: "CTA" },
        ];
      case "Expo":
      default:
        return [
          { key: "basic", label: "Basic Info" },
          { key: "highlights", label: "Highlights" },
          { key: "cta", label: "CTA" },
        ];
    }
  };

  const getDefaultSectionsData = () => ({
    basic: {
      description: "",
    },
    agenda: [],
    speakers: [],
    highlights: [],
    cta: {
      label: "Register Now",
      link: "/login",
    },
  });

  /* ================= SUBMIT ================= */
  const submit = async () => {
    setLoading(true);

    const payload = {
      slug: createSlug(form.name),
      title: form.name,
      date: form.startDate,
      location:
        form.city && form.venue
          ? `${form.city} - ${form.venue}`
          : form.city || "Online",
      
      type: normalizeType(form.type),

      status: form.status === "Published" ? "upcoming" : "draft",

      enabledSections: getDefaultSections(form.type),
      sectionsData: {
        ...getDefaultSectionsData(),
        basic: {
          description: form.description,
          date: form.startDate,
          location:
            form.city && form.venue
              ? `${form.city} - ${form.venue}`
              : form.city || "Online",
        },
      },

      visibility: form.visibility,
      maxCapacity: form.maxCapacity,
    };

    try {
      const { data } = await api.post("/event/admin/events", payload);

      alert("Event created successfully");
      navigate(`/events/${data._id}/edit`);
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Create Event
        </h1>
        <p className="text-sm text-gray-500">
          Create the event shell. You can add sections and content next.
        </p>
      </div>

      {/* BASIC INFO */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={update}
            placeholder="Event Name"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <select
            name="type"
            value={form.type}
            onChange={update}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option>Expo</option>
            <option>Webinar</option>
            <option>Meetup</option>
          </select>
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={update}
          placeholder="Short description (can edit later)"
          rows={4}
          className="border rounded-md px-3 py-2 text-sm w-full"
        />
      </div>

      {/* LOCATION & DATE */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Location & Schedule</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="city"
            value={form.city}
            onChange={update}
            placeholder="City / Online"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            name="venue"
            value={form.venue}
            onChange={update}
            placeholder="Venue / Zoom"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={update}
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* ACCESS */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Access & Rules</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="visibility"
            value={form.visibility}
            onChange={update}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option>Public</option>
            <option>Members Only</option>
          </select>

          <input
            name="maxCapacity"
            value={form.maxCapacity}
            onChange={update}
            placeholder="Max Capacity"
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <select
            name="status"
            value={form.status}
            onChange={update}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/events/all")}
          className="px-4 py-2 text-sm border rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={loading}
          className="px-5 py-2 bg-orange-600 text-white rounded-md text-sm"
        >
          {loading ? "Creating..." : "Create & Configure"}
        </button>
      </div>
    </div>
  );
}
