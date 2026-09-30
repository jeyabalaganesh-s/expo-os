export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "boolean";

export type SectionField = {
  key: string;
  label: string;
  type: FieldType;
};

export type LandingSection = {
  id: string;
  label: string;
  multiple: boolean;
  fields: SectionField[];
  phase: ("PRE" | "ONGOING" | "POST")[];
};
