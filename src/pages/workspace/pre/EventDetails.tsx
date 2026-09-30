import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type EventPhase = "Pre Event" | "Ongoing" | "Post Event";
type EventVisibility = "Public" | "Private";

type EventDetails = {
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  timezone: string;
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
  phase: EventPhase;
  visibility: EventVisibility;
  capacity: number;
};

/* ================= PAGE ================= */

export default function WorkspaceEventDetailsPage() {
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ================= SLUG ================= */

  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= LOAD EVENT ================= */

  const fetchEvent = async () => {
    setLoading(true);
    const res = await api.get(`/event/${slug}`);
    setEvent(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  /* ================= ACTIONS ================= */

  const updateField = (
    key: keyof EventDetails,
    value: any
  ) => {
    setEvent((prev) => ({ ...prev!, [key]: value }));
  };

  const toggleVisibility = () => {
    updateField(
      "visibility",
      event?.visibility === "Public"
        ? "Private"
        : "Public"
    );
  };

  const saveChanges = async () => {
    if (!event) return;

    setSaving(true);
    await api.put(`/events/${slug}`, event);
    setSaving(false);
  };

  /* ================= GUARD ================= */

  if (loading || !event) {
    return (
      <PageShell title="Event Details">
        <div className="text-sm text-gray-500">
          Loading event details…
        </div>
      </PageShell>
    );
  }

  /* ================= UI ================= */

  return (
    <PageShell
      title="Event Details"
      description="Manage core information and lifecycle of this event"
    >
      <div className="space-y-6 max-w-4xl">
        {/* ================= BASIC INFO ================= */}
        <Section title="Basic Information">
          <Input
            label="Event Title"
            value={event.title}
            onChange={(v) => updateField("title", v)}
          />

          <Input
            label="Event Slug"
            value={event.slug}
            disabled
            hint={`https://${event.slug}.event.sukacircle.com`}
          />

          <Textarea
            label="Description"
            value={event.description}
            onChange={(v) =>
              updateField("description", v)
            }
          />
        </Section>

        {/* ================= DATE & TIME ================= */}
        <Section title="Date & Time">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date & Time"
              type="datetime-local"
              icon={<CalendarDays size={14} />}
              value={event.startDate}
              onChange={(v) =>
                updateField("startDate", v)
              }
            />

            <Input
              label="End Date & Time"
              type="datetime-local"
              icon={<Clock size={14} />}
              value={event.endDate}
              onChange={(v) =>
                updateField("endDate", v)
              }
            />
          </div>

          <Input
            label="Timezone"
            value={event.timezone}
            onChange={(v) =>
              updateField("timezone", v)
            }
          />
        </Section>

        {/* ================= LOCATION ================= */}
        <Section title="Location & Mode">
          <div className="grid grid-cols-2 gap-4">
            <select
              value={event.mode}
              onChange={(e) =>
                updateField("mode", e.target.value)
              }
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>

            <Input
              label="Location"
              icon={<MapPin size={14} />}
              value={event.location}
              onChange={(v) =>
                updateField("location", v)
              }
            />
          </div>
        </Section>

        {/* ================= EVENT CONTROL ================= */}
        <Section title="Event Controls">
          <div className="grid grid-cols-3 gap-4">
            <InfoCard
              label="Event Phase"
              value={event.phase}
            />

            <div className="border rounded-lg p-4">
              <label className="text-xs text-gray-500">
                Capacity
              </label>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <input
                  type="number"
                  value={event.capacity}
                  onChange={(e) =>
                    updateField(
                      "capacity",
                      Number(e.target.value)
                    )
                  }
                  className="border rounded px-2 py-1 text-sm w-24"
                />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-2">
                Visibility
              </div>

              <button
                onClick={toggleVisibility}
                className="flex items-center gap-2 text-sm"
              >
                {event.visibility === "Public" ? (
                  <>
                    <ToggleRight className="text-green-600" />
                    Public
                  </>
                ) : (
                  <>
                    <ToggleLeft className="text-gray-400" />
                    Private
                  </>
                )}
              </button>
            </div>
          </div>
        </Section>

        {/* ================= SAVE ================= */}
        <div className="flex justify-end">
          <button
            onClick={saveChanges}
            disabled={saving}
            className="bg-orange-600 text-white px-6 py-2 rounded-md text-sm hover:bg-orange-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </PageShell>
  );
}

/* ================= UI HELPERS ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 space-y-4">
      <h3 className="text-sm font-semibold text-gray-700">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  icon,
  hint,
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  icon?: React.ReactNode;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-2.5 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) =>
            onChange?.(e.target.value)
          }
          className={`w-full border rounded-md px-3 py-2 text-sm ${
            icon ? "pl-9" : ""
          }`}
        />
      </div>
      {hint && (
        <p className="text-xs text-gray-400 mt-1">
          {hint}
        </p>
      )}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">
        {label}
      </label>
      <textarea
        value={value}
        rows={4}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        className="w-full border rounded-md px-3 py-2 text-sm resize-none"
      />
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-xs text-gray-500 mb-1">
        {label}
      </div>
      <div className="flex items-center gap-2 font-medium text-sm">
        {icon}
        {value}
      </div>
    </div>
  );
}
