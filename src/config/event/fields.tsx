/* =====================================================
   EVENT FIELD DEFINITIONS
   Single source of truth for:
   - Forms
   - Permissions
   - Phase-based UI
   - Validation
===================================================== */

export type EventPhase = "PRE" | "ONGOING" | "POST";

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "multiselect"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "image"
  | "file"
  | "url"
  | "richtext";

/* =====================================================
   FIELD INTERFACE
===================================================== */

export interface EventField {
  key: string;
  label: string;
  type: FieldType;
  phase: EventPhase[];
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  description?: string;
  hidden?: boolean;
}

/* =====================================================
   EVENT FIELDS
===================================================== */

export const EVENT_FIELDS: EventField[] = [
  /* ================= BASIC INFO ================= */
  {
    key: "title",
    label: "Event Title",
    type: "text",
    phase: ["PRE"],
    required: true,
  },
  {
    key: "slug",
    label: "Event Slug",
    type: "text",
    phase: ["PRE"],
    description: "Used for subdomain (eventslug.event.sukacircle.com)",
    required: true,
  },
  {
    key: "shortDescription",
    label: "Short Description",
    type: "textarea",
    phase: ["PRE"],
  },
  {
    key: "fullDescription",
    label: "Full Description",
    type: "richtext",
    phase: ["PRE"],
  },
  {
    key: "eventType",
    label: "Event Type",
    type: "select",
    phase: ["PRE"],
    required: true,
    options: [
      { label: "Expo", value: "Expo" },
      { label: "Webinar", value: "Webinar" },
      { label: "Conference", value: "Conference" },
      { label: "Circle Meet", value: "CircleMeet" },
      { label: "Workshop", value: "Workshop" },
    ],
  },

  /* ================= DATE & TIME ================= */
  {
    key: "startDateTime",
    label: "Start Date & Time",
    type: "datetime",
    phase: ["PRE"],
    required: true,
  },
  {
    key: "endDateTime",
    label: "End Date & Time",
    type: "datetime",
    phase: ["PRE"],
    required: true,
  },
  {
    key: "timezone",
    label: "Timezone",
    type: "select",
    phase: ["PRE"],
    options: [
      { label: "IST", value: "Asia/Kolkata" },
      { label: "UTC", value: "UTC" },
    ],
  },

  /* ================= LOCATION ================= */
  {
    key: "mode",
    label: "Event Mode",
    type: "select",
    phase: ["PRE"],
    options: [
      { label: "Online", value: "Online" },
      { label: "Offline", value: "Offline" },
      { label: "Hybrid", value: "Hybrid" },
    ],
  },
  {
    key: "venueName",
    label: "Venue Name",
    type: "text",
    phase: ["PRE"],
  },
  {
    key: "venueAddress",
    label: "Venue Address",
    type: "textarea",
    phase: ["PRE"],
  },
  {
    key: "streamingLink",
    label: "Streaming Link",
    type: "url",
    phase: ["ONGOING"],
  },

  /* ================= REGISTRATION ================= */
  {
    key: "registrationEnabled",
    label: "Enable Registration",
    type: "boolean",
    phase: ["PRE"],
  },
  {
    key: "maxRegistrations",
    label: "Max Registrations",
    type: "number",
    phase: ["PRE"],
  },
  {
    key: "approvalRequired",
    label: "Approval Required",
    type: "boolean",
    phase: ["PRE"],
  },

  /* ================= PAYMENTS ================= */
  {
    key: "isPaidEvent",
    label: "Paid Event",
    type: "boolean",
    phase: ["PRE"],
  },
  {
    key: "currency",
    label: "Currency",
    type: "select",
    phase: ["PRE"],
    options: [
      { label: "INR", value: "INR" },
      { label: "USD", value: "USD" },
    ],
  },

  /* ================= AGENDA ================= */
  {
    key: "agendaEnabled",
    label: "Enable Agenda",
    type: "boolean",
    phase: ["PRE", "ONGOING"],
  },

  /* ================= LIVE OPERATIONS ================= */
  {
    key: "checkInRequired",
    label: "Enable Check-in",
    type: "boolean",
    phase: ["ONGOING"],
  },
  {
    key: "liveChatEnabled",
    label: "Enable Live Chat",
    type: "boolean",
    phase: ["ONGOING"],
  },

  /* ================= POST EVENT ================= */
  {
    key: "recordingLink",
    label: "Recording Link",
    type: "url",
    phase: ["POST"],
  },
  {
    key: "feedbackForm",
    label: "Feedback Form Link",
    type: "url",
    phase: ["POST"],
  },
  {
    key: "certificateTemplate",
    label: "Certificate Template",
    type: "file",
    phase: ["POST"],
  },
];
