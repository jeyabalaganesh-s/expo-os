export type EventPhase = "PRE" | "ONGOING" | "POST";

export const LANDING_SECTIONS = [
  {
    key: "hero",
    label: "Hero Section",
    phase: ["PRE"],
    multiple: false,
    fields: [
      {
        key: "title",
        label: "Title",
        type: "text",
        placeholder: "Event main heading",
        required: true,
      },
      {
        key: "subtitle",
        label: "Subtitle",
        type: "textarea",
        placeholder: "Short supporting description",
      },
      {
        key: "ctaLabel",
        label: "CTA Label",
        type: "text",
        placeholder: "Register Now",
      },
      {
        key: "ctaLink",
        label: "CTA Link",
        type: "url",
        placeholder: "/register",
      },
    ],
  },

  {
    key: "highlights",
    label: "Highlights",
    phase: ["PRE"],
    multiple: true,
    fields: [
      {
        key: "label",
        label: "Label",
        type: "text",
        placeholder: "Seats",
      },
      {
        key: "value",
        label: "Value",
        type: "text",
        placeholder: "200",
      },
    ],
  },

  {
    key: "faq",
    label: "FAQ",
    phase: ["PRE"],
    multiple: true,
    fields: [
      {
        key: "question",
        label: "Question",
        type: "text",
        placeholder: "Who should attend?",
      },
      {
        key: "answer",
        label: "Answer",
        type: "textarea",
        placeholder: "Answer goes here",
      },
    ],
  },
];
