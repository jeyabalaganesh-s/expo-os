import { useState } from "react";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type AccessType = "Public" | "Members Only";
type WebinarStatus = "Draft" | "Published";

export default function CreateWebinarPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    speaker: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    access: "Public" as AccessType,
    maxSeats: "",
    meetingLink: "",
    status: "Draft" as WebinarStatus,
  });

  const update = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= HELPERS ================= */

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  /* ================= SUBMIT ================= */

  const submit = async () => {
    if (!form.title || !form.date || !form.time) {
      alert("Title, Date and Time are required");
      return;
    }

    const payload = {
      slug: slugify(form.title),

      title: form.title,
      type: "Webinar",

      description: form.description,
      date: form.date,
      time: form.time,
      location: "Online",

      status:
        form.status === "Published"
          ? "upcoming"
          : "draft",

      format: {
        mode: "Online",
        duration: `${form.duration} mins`,
        language: "English",
        interaction: "Live Q&A",
      },

      speakers: form.speaker
        ? [
            {
              name: form.speaker,
            },
          ]
        : [],

      pricing: {
        type: "free",
        price: "0",
      },

      highlights: [
        {
          label: "Access",
          value: form.access,
        },
        {
          label: "Max Seats",
          value: form.maxSeats || "Unlimited",
        },
      ],

      cta: {
        label: "Join Webinar",
        link: form.meetingLink,
      },
    };

    try {
      setLoading(true);
      await api.post("/event/admin/events", payload);
      alert("Webinar created successfully");
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Failed to create webinar"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Create Webinar
        </h1>
        <p className="text-sm text-gray-500">
          Set up webinar details, access rules, and
          schedule
        </p>
      </div>

      {/* ================= BASIC DETAILS ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">
          Basic Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={update}
            placeholder="Webinar Title"
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            name="speaker"
            value={form.speaker}
            onChange={update}
            placeholder="Speaker Name"
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={update}
          placeholder="Webinar description"
          rows={4}
          className="border rounded-md px-3 py-2 text-sm w-full"
        />
      </div>

      {/* ================= SCHEDULE ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">
          Schedule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={update}
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={update}
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            name="duration"
            value={form.duration}
            onChange={update}
            placeholder="Duration (mins)"
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* ================= ACCESS & CAPACITY ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">
          Access & Capacity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="access"
            value={form.access}
            onChange={update}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option>Public</option>
            <option>Members Only</option>
          </select>

          <input
            name="maxSeats"
            value={form.maxSeats}
            onChange={update}
            placeholder="Max Seats"
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

      {/* ================= MEETING LINK ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">
          Meeting Information
        </h2>

        <input
          name="meetingLink"
          value={form.meetingLink}
          onChange={update}
          placeholder="Zoom / Google Meet link"
          className="border rounded-md px-3 py-2 text-sm w-full"
        />
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 text-sm border rounded-md">
          Cancel
        </button>

        <button
          onClick={submit}
          disabled={loading}
          className="px-5 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save Webinar"}
        </button>
      </div>
    </div>
  );
}
