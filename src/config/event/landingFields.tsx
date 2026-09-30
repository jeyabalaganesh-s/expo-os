/* =====================================================
   EVENT LANDING PAGE FIELDS
===================================================== */

/* =====================================================
   EVENT LANDING PAGE FIELDS
===================================================== */
import type { FieldType } from "./fields";
import type { EventPhase } from "./fields";

/* =====================================================
   FIELD INTERFACE
===================================================== */

export interface LandingField {
  key: string;
  label: string;
  type: FieldType;
  phase: EventPhase[];
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  description?: string;
}

/* =====================================================
   LANDING PAGE FIELDS
===================================================== */

export const LANDING_FIELDS: LandingField[] = [
  /* ================= HERO SECTION ================= */
  {
    key: "heroTitle",
    label: "Hero Title",
    type: "text",
    phase: ["PRE"],
    required: true,
    placeholder: "How I Built My Food Brand",
  },
  {
    key: "heroSubtitle",
    label: "Hero Subtitle",
    type: "textarea",
    phase: ["PRE"],
    placeholder: "Learn the real journey from idea to income",
  },
  {
    key: "heroBackgroundImage",
    label: "Hero Background Image",
    type: "image",
    phase: ["PRE"],
  },
  {
    key: "heroCTA",
    label: "Primary CTA Text",
    type: "text",
    phase: ["PRE"],
    placeholder: "Register Now",
  },

  /* ================= EVENT HIGHLIGHTS ================= */
  {
    key: "highlights",
    label: "Event Highlights",
    type: "multiselect",
    phase: ["PRE"],
    description: "Key reasons to attend",
    options: [
      { label: "Live Session", value: "live" },
      { label: "Networking", value: "networking" },
      { label: "Expert Speakers", value: "speakers" },
      { label: "Free Entry", value: "free" },
    ],
  },

  /* ================= ABOUT EVENT ================= */
  {
    key: "aboutTitle",
    label: "About Section Title",
    type: "text",
    phase: ["PRE"],
    placeholder: "About This Event",
  },
  {
    key: "aboutDescription",
    label: "About Description",
    type: "richtext",
    phase: ["PRE"],
  },

  /* ================= SPEAKERS ================= */
  {
    key: "showSpeakers",
    label: "Show Speakers Section",
    type: "boolean",
    phase: ["PRE"],
  },
  {
    key: "speakerLayout",
    label: "Speaker Layout",
    type: "select",
    phase: ["PRE"],
    options: [
      { label: "Grid", value: "grid" },
      { label: "Carousel", value: "carousel" },
    ],
  },

  /* ================= AGENDA PREVIEW ================= */
  {
    key: "showAgendaPreview",
    label: "Show Agenda Preview",
    type: "boolean",
    phase: ["PRE"],
  },
  {
    key: "agendaPreviewLimit",
    label: "Agenda Items to Show",
    type: "number",
    phase: ["PRE"],
  },

  /* ================= REGISTRATION CTA ================= */
  {
    key: "registrationCTA",
    label: "Registration CTA Text",
    type: "text",
    phase: ["PRE"],
    placeholder: "Reserve Your Seat",
  },
  {
    key: "registrationNote",
    label: "Registration Note",
    type: "textarea",
    phase: ["PRE"],
    placeholder: "Limited seats available",
  },

  /* ================= SOCIAL PROOF ================= */
  {
    key: "showTestimonials",
    label: "Show Testimonials",
    type: "boolean",
    phase: ["PRE"],
  },
  {
    key: "testimonialTitle",
    label: "Testimonials Title",
    type: "text",
    phase: ["PRE"],
  },

  /* ================= FAQ ================= */
  {
    key: "showFAQ",
    label: "Show FAQ Section",
    type: "boolean",
    phase: ["PRE"],
  },

  /* ================= SEO ================= */
  {
    key: "seoTitle",
    label: "SEO Title",
    type: "text",
    phase: ["PRE"],
  },
  {
    key: "seoDescription",
    label: "SEO Description",
    type: "textarea",
    phase: ["PRE"],
  },
  {
    key: "socialShareImage",
    label: "Social Share Image",
    type: "image",
    phase: ["PRE"],
  },

  /* ================= FOOTER ================= */
  {
    key: "footerText",
    label: "Footer Text",
    type: "textarea",
    phase: ["PRE", "POST"],
  },
];
