import type { LandingSection } from "../../types/landing";

export const DEFAULT_LANDING_SECTIONS: LandingSection[] = [
  {
    id: "hero",
    label: "Hero Section",
    multiple: false,
    phase: ["PRE"],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "ctaLabel", label: "CTA Label", type: "text" },
      { key: "ctaLink", label: "CTA Link", type: "url" },
    ],
  },
];
